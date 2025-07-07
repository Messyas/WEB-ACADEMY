import { Request, Response } from "express";
import { changePasswordUser, createUser } from "./user.service";
import { changePasswordDto, CreateUserDto } from "./user.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { findUserByEmail } from "./user.service";

const index = async (req: Request, res: Response) => {};

const create = async (req: Request, res: Response) => {
  const data = req.body as CreateUserDto;
  try {
    if (await findUserByEmail(data.email)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    } else {
      const user = await createUser(data);
      res.status(StatusCodes.CREATED).json(user);
    }
  } catch (err) {
    console.log(err);
  }
};

const read = async (req: Request, res: Response) => {};

const update = async (req: Request, res: Response) => {
  //so nao tem email e senha
};

const remove = async (req: Request, res: Response) => {};

const changePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {newPassword, oldPassword} = req.body as changePasswordDto;
  try {
    const ok = await changePasswordUser(id, oldPassword, newPassword);
    if (ok) {
      res.status(StatusCodes.OK).send(ReasonPhrases.OK); //NAO USE ACCEPTED
    } else {
      res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    }
  } catch (err) {
    //user error 
    console.log(err);
  }
};

export default { index, create, read, update, remove, changePassword };
