import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.session.uid;
  if (uid) next();
  else res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
};

export default isAuth;
