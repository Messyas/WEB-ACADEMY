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
