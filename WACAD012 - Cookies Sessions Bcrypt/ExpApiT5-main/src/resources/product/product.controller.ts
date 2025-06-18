import { Request, Response } from "express";
import { CreateProductDTO } from "../productArray/product.types";
import { createProduct } from "../productArray/product.service";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
import { getProducts } from "./product.service";
import { createProductError } from "./product.errors";

const index = async (req: Request, res: Response) => {
  const products = await getProducts();
  try {
    res.status(StatusCodes.OK).json(products);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    
  }
};

const create = async (req: Request, res: Response) => {
  const newProduct = req.body as CreateProductDTO;
  try {
    const product = await createProduct(newProduct);
    res.status(StatusCodes.CREATED).json(product);
  } catch (err) {
    createProductError(res, err);
  }
};
