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
        `[Completo] DATA: ${date} - URL: ${req.url}, METODO: ${req.method}, ${req.httpVersion}, User-Agent: ${req.get('User-Agent')}`,
        { flag: 'a' },
      );
      next();
    };
  } else {
    return async (req: Request, res: Response, next: NextFunction) => {
      await fsPromises.writeFile(
        `${process.cwd()}/${LOGS_PATH}/logs.log`,
        `[Simples] DATA: ${date} - URL: ${req.url}, METODO: ${req.method}\n`,
        { flag: 'a' },
      );
      next();
    };
  }
}

export default logger;
