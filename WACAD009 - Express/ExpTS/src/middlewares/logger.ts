import { NextFunction, Request, Response } from "express"
import fs from "fs/promises"

type LoggerType = 'complete' | 'simple';

const LOGS_PATH = process.env.LOGDIR ?? 'logs'


function logger (type: LoggerType) {
    if (type === 'simple') {
        return async (req: Request, res:Response, next: NextFunction) => {
            console.log('simple')
            const date = new Date().toISOString();
            await fs.writeFile(`${process.cwd()}/${LOGS_PATH}/logs.log`, `${date}`)
            next()
        } 
    } else {
            return (req: Response, res:Response, next: NextFunction) => {
            console.log('simple')
            next()
        }
    }

}

export default logger;