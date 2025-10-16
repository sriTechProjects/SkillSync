import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository";
import { User } from "@prisma/client";
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { RequestOtpDto } from "../dtos/auth/request-otp.dto";
import { VerifyOtpDto } from "../dtos/auth/verify-otp.dto";
import { otpRepository } from "../repositories/otp.repository";
import { smsService } from "./sms.service";

const generateOtp = (): string => Math.floor(100000 + Math.random() * 900000).toString();

class AuthService {
  // ---- EMAIL/PASSWORD REGISTER ----
  public async registerUser(registerUserDto: RegisterUserDto) {
    const { email, password } = registerUserDto;

    if (!email || !password) {
      throw new Error("Fill the Required fields");
    }

    const user = await userRepository.findByEmail(email);
    if (user) {
      throw new Error("This account already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    return await userRepository.createUser(email, passwordHash);
  }

  // ---- EMAIL LOGIN ----
  public async loginUser(dto: LoginUserDto): Promise<User> {
    const { email, password } = dto;

    const user = await userRepository.findByEmail(email);
    if (!user || !user.passwordHash) throw new Error("Invalid email or password.");

    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordMatch) throw new Error("Invalid email or password.");

    return user;
  }

  // ---- PHONE OTP ----
  public async requestOtp(dto: RequestOtpDto): Promise<void> {
    const { phoneNumber } = dto;
    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await otpRepository.deleteByPhoneNumber(phoneNumber);
    await otpRepository.create(phoneNumber, code, expiresAt);
    await smsService.sendOtp(phoneNumber, code);
  }

//   public async verifyOtp(dto: VerifyOtpDto): Promise<User> {
//     const { phoneNumber, code } = dto;
//     const otpRecord = await otpRepository.find(phoneNumber, code);

//     if (!otpRecord) throw new Error("Invalid OTP.");
//     if (otpRecord.expiresAt < new Date()) {
//       await otpRepository.delete(otpRecord.id);
//       throw new Error("OTP has expired.");
//     }

//     await otpRepository.delete(otpRecord.id);

//     let user = await userRepository.findByPhoneNumber(phoneNumber);
//     if (!user) {
//       user = await userRepository.createUser({
//         phoneNumber,
//         phoneVerified: true,
//         email: null,
//         passwordHash: null,
//         username: null,
//         firstName: null,
//         lastName: null,
//         provider: "phone",
//         providerId: null,
//         bio: null,
//         profilePicture: null,
//         isProfileComplete: false,
//         role: "USER",
//       });
//     }

//     return user;
//   }
// }
}

export const authService = new AuthService();
