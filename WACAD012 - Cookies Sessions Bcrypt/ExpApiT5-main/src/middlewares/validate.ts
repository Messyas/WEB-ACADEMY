import { Schema } from "joi"

const validate(schema: Schema) => {
    return(req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req.body)
        if(result.error) 
            res.status(StausCodes.BAD_REQUEST.send(result.error.details))
        else next()
           }
}