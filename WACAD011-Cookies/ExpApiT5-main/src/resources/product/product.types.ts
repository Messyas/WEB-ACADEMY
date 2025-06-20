import { Product } from "@prisma/client";

export type CreatePruductDto = Pick<
  Product,
  "name" | "price" | "stockQuantity"
>;
