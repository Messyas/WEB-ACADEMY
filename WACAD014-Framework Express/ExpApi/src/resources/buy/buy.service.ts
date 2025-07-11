import { PrismaClient } from "@prisma/client";
import { ProductCart } from "./buy.types";

const prisma = new PrismaClient();

export const placeOrder = async (
    userId: string,
    cart: ProductCart[]
) => {
    const order = await prisma.order.create({

    })
}