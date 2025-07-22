import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { LoginDto } from "./auth.types";
import { UserTypes } from "../userType/userType.constants";

const prisma = new PrismaClient();

export const checkAuth = async (
  credentials: LoginDto
): Promise<User | null> => {
  const { email, password } = credentials;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return null;
  }
  const ok = await bcrypt.compare(password, user.password);
  console.log(ok);

  return user;
};

export const checkIsAdmin = async (id: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (user && user.userTypeId === UserTypes.admin) {
    return true;
  }
  return false;
};
