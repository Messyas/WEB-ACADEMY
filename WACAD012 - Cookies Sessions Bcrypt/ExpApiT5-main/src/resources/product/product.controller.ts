import { Request, Response } from "express";
import { CreateProductDTO } from "../productArray/product.types";
import { createProduct } from "../productArray/product.service";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";

const index = async (req: Request, res: Response) => {};

const create = async (req: Request, res: Response) => {
  const newProduct = req.body as CreateProductDTO;
  try {
    const product = await createProduct(newProduct);
    res.status(StatusCodes.CREATED).json(product);
  } catch (err) {
    createProduct
  }
};
