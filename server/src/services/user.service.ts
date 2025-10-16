import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { userRepository } from "../repositories/user.repository";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

class UserService {
  public async getProfile(userId: string): Promise<Omit<User, "passwordHash"> | null> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    // Exclude the password hash before returning
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  public async updateProfile(userId: string, data: UpdateUserDto): Promise<Omit<User, "passwordHash">> {
    const currentUser = await userRepository.findById(userId);
    if (!currentUser) {
      throw new Error("User not found.");
    }

    if (data.phoneNumber) {
      const existingUser = await userRepository.findByPhoneNumber(data.phoneNumber);
      if (existingUser && existingUser.id !== userId) {
        throw new Error("Phone number is already in use.");
      }
    }

    const updateData: any = { ...data };
    if (data.phoneNumber && data.phoneNumber !== currentUser.phoneNumber) {
      updateData.phoneVerified = false;
    }

    // if (data.email) {
    //   const existingUser = await userRepository.findByEmail(data.email);
    //   if (existingUser && existingUser.id !== userId) {
    //     throw new Error("Email is already in use.");
    //   }
    // }

    // --- ADD THIS MISSING BLOCK ---
    // If the profile is not yet complete and a bio is provided, mark it as complete.
    if (!currentUser.isProfileComplete) {
      updateData.isProfileComplete = true;
    }
    // -----------------------------

    if (data.username) {
      const existingUser = await userRepository.findByUsername(data.username);
      if (existingUser && existingUser.id !== userId) {
        throw new Error("Username is already taken.");
      }
    }

    // if (data.password) {
    //   updateData.passwordHash = await bcrypt.hash(data.password, 10);
    //   delete updateData.password; 
    // }

    const updatedUser = await userRepository.updateUser(userId, updateData);

    const { passwordHash, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}

export const userService = new UserService();
