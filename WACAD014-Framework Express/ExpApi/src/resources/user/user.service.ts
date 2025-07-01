import { Prisma, User } from "@prisma/client";
import { CreateUserDto } from "./user.types";
import { genSalt, hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createUser = async(data: CreateUserDto): Promise<User> =>{
    const salt = await genSalt(parseInt(process.env.ROUNDS_BCRYPT!));
    const password = await hash(data.password, salt);
    return await prisma.user.create({
        data: {
            ...data,
            password, //substitui o password de data
        },
    });

}