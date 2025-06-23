import { CreateProductDto, UpdateProductDto } from "./product.types";
import { PrismaClient, Product } from "@prisma/client";


const prisma = new PrismaClient();

export const getAllProducts = async (): Promise<Product[]> => {
  return await prisma.product.findMany();
};

export const createProduct = async (
  Product: CreateProductDto
): Promise<Product> => {
  return await prisma.product.create({ data: Product });
};

export const getProduct = async (id: string): Promise<Product | null> => {
  return prisma.product.findUnique({ where: { id } });
};

export const updateProduct = async (
  id: string,
  Product: UpdateProductDto
): Promise<Product> => {
  const ProductUpdated = await prisma.product.update({
    where: { id },
    data: Product,
  });
  return ProductUpdated;
};

export const deleteProduct = async (id: string): Promise<Product> => {
  return await prisma.product.delete({ where: { id } });
};
