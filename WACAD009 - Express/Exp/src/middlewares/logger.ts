import { NextFunction, Request, Response } from 'express';
import fsPromises from 'fs/promises';
import { LoggerType } from '../types/main';

function logger(type: LoggerType) {
  const LOGS_PATH = process.env.LOGS_PATH ?? 'logs';
  const date = new Date().toISOString();
  if (type === 'completo') {
    return async (req: Request, res: Response, next: NextFunction) => {
      await fsPromises.writeFile(
        `${process.cwd()}/${LOGS_PATH}/logs.log`,
        `[Completo] ${new Date().toISOString()} - Metodo: ${req.method},
         URL: ${req.originalUrl}, IP: ${req.ip}\n, Data: ${date}`, 
        { flag: 'a' },
      );
      next();
    };
  } else {
    return async (req: Request, res: Response, next: NextFunction) => {
      await fsPromises.writeFile(
        `${process.cwd()}/${LOGS_PATH}/logs.log`,
        `[Simples] ${new Date().toISOString()} - Método: ${req.method}, URL: ${req.originalUrl}\n`,
        { flag: 'a' },
      );
      next();
    };
  }
}

export default logger;
