import { prisma } from "../config/prisma";
import { User } from "@prisma/client";

import { UpdateUserDto } from "../dtos/user/update-user.dto";

type UserCreationParams = Omit<User, "id" | "creditBalance" | "createdAt" | "updatedAt">;

class UserRepository {
  public async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  public async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } });
  }

  public async createUser(email: string, password: string): Promise<User> {
    return prisma.user.create({
      data: {
        email: email,
        passwordHash: password,
      },
    });
  }

  public async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  public async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  public async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { phoneNumber } });
  }
}

export const userRepository = new UserRepository();
