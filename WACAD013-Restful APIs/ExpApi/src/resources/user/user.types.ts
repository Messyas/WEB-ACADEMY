import { User } from "@prisma/client"

export type CreateUserDto = Pick<User, "name" | "email" | "password" | "userTypeId"> 
export type UpdateUserDto = Pick<User, "name">;

//sempre que tem formulario tem dto
export type changePasswordDto = {
    oldPassword: string;
    newPassword: string;
} 