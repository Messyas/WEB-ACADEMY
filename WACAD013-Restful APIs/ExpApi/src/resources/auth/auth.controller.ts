import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { createUser, findUserByEmail } from "../user/user.service";
import { SignUpDto } from "./auth.types";
import { UserTypes } from "../userType/userType.constants";
import { checkAuth } from "./auth.service";

const signup = async (req: Request, res: Response) => {
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
  const data = req.body as SignUpDto;
  try {
    if (await findUserByEmail(data.email)) {
      res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    } else {
      const user = await createUser({ ...data, userTypeId: UserTypes.client });
      res.status(StatusCodes.OK).json(user);
    }
  } catch (err) {
    //tem que fazer o user error
    console.error(err);
  }
};

const login = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Loga um usuário.'
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/LoginDto' }
 }
 #swagger.responses[200] = {}
 */
  const { email, password } = req.body;
  try {
    const user = await checkAuth({ email, password });
    if (!user) {
      res.status(401).json({ msg: "Email e/ou senha incorretos" });
      return;
    }
    req.session.uid = user.id;
    req.session.userType = user.userTypeId; //esse userType ta meio sus, verificar depois
    res.status(200).json({ msg: "Usuário autenticado" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const logout = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Desloga um usuário.'
 #swagger.responses[200] = {}
 */
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ msg: "Erro ao encerrar sessão" });
      return;
    }
    res.status(200).json({ msg: "Sessão encerrada com sucesso" });
  });
};

export default {
  signup,
  login,
  logout,
};
