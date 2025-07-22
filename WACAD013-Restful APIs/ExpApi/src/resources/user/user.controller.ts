import { Request, Response } from "express";
import {
  changePasswordUser,
  createUser,
  deleteUser,
  findUserById,
  getAllUsers,
  updateUser,
} from "./user.service";
import { changePasswordDto, CreateUserDto, UpdateUserDto } from "./user.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { findUserByEmail } from "./user.service";
import { UserType } from "@prisma/client";

const index = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Lista todos os usuários.'
    #swagger.description = 'Retorna uma lista de todos os usuários'
    #swagger.parameters['typeUser'] = {
        in: 'query',
        description: 'Filtra os usuários pelo tipo (ex: ADMIN, USER).',
        required: false,
        type: 'string',
        enum: ['ADMIN', 'USER']
    }
  */
  const typeUser = req.query.typeUser as UserType | undefined;
  try {
    const users = await getAllUsers(typeUser);
    if (users) {
      res.status(StatusCodes.OK).json(users);
    } else {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const create = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Adiciona um novo usuário na base.'
    #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/CreateUsuarioDto' }
    }
    #swagger.responses[200] = {
    schema: { $ref: '#/definitions/Usuario' }
    }
 */
  const data = req.body as CreateUserDto;
  try {
    if (await findUserByEmail(data.email)) {
      res
        .status(StatusCodes.CONFLICT)
        .send("Um usuário com esse email já existe");
      return;
    } else {
      const user = await createUser(data);
      res.status(StatusCodes.CREATED).json(user);
    }
  } catch (err) {
    console.log(err);
  }
};

const read = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Recupera dados de um produto usuário específico.'
 #swagger.parameters['id'] = { description: "ID do usuário" }
 #swagger.responses[200] = {
   schema: { $ref: '#/definitions/Usuario' }
 }
 */
  const { id } = req.params;
  try {
    const user = await findUserByEmail(id);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const update = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Atualiza informações de um usuário específico.'
  #swagger.parameters['id'] = { description: "ID do usuário" }
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/CreateUsuarioDto' }
 }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/Usuario' }
 }
 */
  const { id } = req.params;
  const data = req.body as UpdateUserDto;
  try {
    const userUpdated = await updateUser(id, data);
    if (userUpdated) {
      res.status(StatusCodes.OK).json(userUpdated);
    } else {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const remove = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Deleta um usuário específico.'
 #swagger.parameters['id'] = { description: "ID do usuário" }
 #swagger.responses[200] = {}
 */
  const { id } = req.params;
  try {
    const user = await findUserById(id);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }
    await deleteUser(id);
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const changePassword = async (req: Request, res: Response) => {
   /*
    #swagger.summary = 'Altera a senha de um usuário.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário.',
        required: true,
        type: 'string'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Senha antiga e nova senha.',
        required: true,
        schema: { $ref: '#/definitions/changePasswordDto' }
    }
    #swagger.responses[200] = { description: 'Senha alterada com sucesso.' }
    #swagger.responses[400] = { description: 'Requisição inválida (ex: senha antiga incorreta).' }
    #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */
  const { id } = req.params;
  const { newPassword, oldPassword } = req.body as changePasswordDto;
  try {
    const ok = await changePasswordUser(id, oldPassword, newPassword);
    if (ok) {
      res.status(StatusCodes.OK).send(ReasonPhrases.OK); //NAO USE ACCEPTED
    } else {
      res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    }
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export default { index, create, read, update, remove, changePassword };
