import { PrismaClient } from "@prisma/client";
import { ProductCart } from "./buy.types";

const prisma = new PrismaClient();

export const placeOrder = async (userId: string, cart: ProductCart[]) => {
  const order = await prisma.order.create({
    data: {
      userId,
    },
  });

  cart.forEach(async (product) => {
    await saveProductOrder(order.id, product);
  });
};

const saveProductOrder = async (orderId: string, product: ProductCart) => {
  await prisma.orderItem.create({
    data: {
      orderId,
      productId: product.id,
      quantity: product.quantity,
    },
  });
};
