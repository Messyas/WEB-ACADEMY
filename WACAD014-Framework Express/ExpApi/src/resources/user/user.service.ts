import { Prisma, User } from "@prisma/client";
import { CreateUserDto } from "./user.types";
import { compare, genSalt, hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (data: CreateUserDto): Promise<User> => {
  const salt = await genSalt(parseInt(process.env.ROUNDS_BCRYPT!));
  const password = await hash(data.password, salt);
  return await prisma.user.create({
    data: {
      ...data,
      password, //substitui o password de data
    },
  });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};

export const changePasswordUser = async (
  id: string,
  oldPassword: string,
  newPassword: string
): Promise<boolean> => {
  const user = await prisma.user.findFirst({ where: { id } });
  if (user) {
    const ok = await compare(oldPassword, user.password);
    if (ok) {
      const salt = await genSalt(parseInt(process.env.ROUNDS_BCRYPT!));
      const password = await hash(newPassword, salt);
      //update no banco
      await prisma.user.update({
        where: { id },
        data: { ...user, password },
      });
      return true;
    }
  }
  return false;
};
