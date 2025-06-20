import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

export const createProductError = (res: Response, err: Error) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(StatusCodes.BAD_REQUEST).json(err);
    }
    if (err instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({
        error: "Validation Error",
        message: "The data provided is invalid. ",
      });
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({
        error: "Database Error",
        message: err.message,
      });
    } else {
      res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong. Please try again later.",
      });
    }
}