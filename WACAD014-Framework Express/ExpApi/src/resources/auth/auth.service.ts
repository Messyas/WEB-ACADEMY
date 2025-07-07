import { PrismaClient, User } from "@prisma/client";
import { LoginDto } from "./auth.types";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const checkAuth = async (
  credentials: LoginDto
): Promise<User | null> => {
  const { email, password } = credentials;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password);
  return ok ? user : null;
};

export const checkIsAdmin = async (uid: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { id: uid },
    select: { userTypeId: true },
  });
  return user?.userTypeId === "admin";
};