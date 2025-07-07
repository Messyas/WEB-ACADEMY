import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { createUser, findUserByEmail } from "../user/user.service";
import { SignUpDto } from "./auth.types";
import { UserTypes } from "../userType/userType.constants";

const signup = async (req: Request, res: Response) => {
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

const login = async (req: Request, res: Response) => {};

const logout = async (req: Request, res: Response) => {};

export default {
  signup,
  login,
  logout,
};
