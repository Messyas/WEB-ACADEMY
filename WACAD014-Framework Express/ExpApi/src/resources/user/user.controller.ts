import { Request, Response } from "express";
import { createUser } from "./user.service";
import { CreateUserDto } from "./user.types";
import { StatusCodes } from "http-status-codes";

const index = async (req: Request, res: Response) => {
  
};

const create = async (req: Request, res: Response) => {
  const data = req.body as CreateUserDto;
  try {
    const user = await createUser(data);
    res.status(StatusCodes.CREATED).json(user);
  } catch (err) {
    console.log(err);
  }
};

const read = async (req: Request, res: Response) => {

};

const update = async (req: Request, res: Response) => {

};

const remove = async (req: Request, res: Response) => {
  
};

const changePassword = async (req: Request, res: Response) => {

}

export default { index, create, read, update, remove, changePassword };
