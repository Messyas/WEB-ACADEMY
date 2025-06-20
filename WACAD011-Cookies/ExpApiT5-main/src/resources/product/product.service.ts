import { PrismaClient } from "@prisma/client";
import { CreateProductDTO } from "../productArray/product.types";

const prisma = new PrismaClient();

export const getProducts = async () => {
  return await prisma.product.findMany();
}

const createProduct = async(product: CreateProductDTO): Promise<void> => {
  return await prisma.product.create({ data: product });
}