import { Request, Response, NextFunction } from "express";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.uid) {
    next(); // usuário autenticado
  } else {
    res.status(401).json({ msg: "Usuário não autenticado" });
  }
};

export default isAuth;
