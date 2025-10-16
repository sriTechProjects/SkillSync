import { Request, Response } from "express";
import { authService } from "../services/auth.service";

import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { generateToken } from "../config/jwt";
import { RequestOtpDto } from "../dtos/auth/request-otp.dto";
import { VerifyOtpDto } from "../dtos/auth/verify-otp.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";

class AuthController {
  // src/controllers/auth.controller.ts

  public async login(req: Request, res: Response): Promise<Response> {
    const loginUserDto = plainToInstance(LoginUserDto, req.body);
    const errors = await validate(loginUserDto);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => Object.values(error.constraints || {})).flat();
      return res.status(400).json({ message: "Validation failed", errors: errorMessages });
    }

    try {
      const user = await authService.loginUser(loginUserDto);

      // Generate the JWT
      const token = generateToken(user.id);

      const userResponse = { ...user };
      delete (userResponse as any).passwordHash;

      return res.status(200).json({
        message: "Login successful!",
        user: userResponse,
        token: token,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(401).json({ message: error.message });
    }
  }

  public async register(req: Request, res: Response): Promise<Response> {
    const registerUserDto = plainToInstance(RegisterUserDto, req.body);
    const errors = await validate(registerUserDto);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => Object.values(error.constraints || {})).flat();
      return res.status(400).json({ message: "Validation failed", errors: errorMessages });
    }

    try {
      const user = await authService.registerUser(registerUserDto);

      const userResponse = { ...user };
      delete (userResponse as any).passwordHash;

      return res.status(201).json({
        message: "Registration successful!",
        user: userResponse,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async requestOtp(req: Request, res: Response): Promise<Response> {
    const requestOtpDto = plainToInstance(RequestOtpDto, req.body);
    const errors = await validate(requestOtpDto);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => Object.values(error.constraints || {})).flat();
      return res.status(400).json({ message: "Validation failed", errors: errorMessages });
    }

    try {
      await authService.requestOtp(requestOtpDto);
      return res.status(200).json({ message: "OTP sent successfully." });
    } catch (error: any) {
      return res.status(500).json({ message: "Failed to send OTP.", error: error.message });
    }
  }

  // public async verifyOtp(req: Request, res: Response): Promise<Response> {
  //   const verifyOtpDto = plainToInstance(VerifyOtpDto, req.body);
  //   const errors = await validate(verifyOtpDto);

  //   if (errors.length > 0) {
  //     const errorMessages = errors.map((e) => Object.values(e.constraints || {})).flat();
  //     return res.status(400).json({ message: "Validation failed", errors: errorMessages });
  //   }

  //   try {
  //     const user = await authService.verifyOtp(verifyOtpDto);
  //     const token = generateToken(user.id);

  //     const userResponse = { ...user };
  //     delete (userResponse as any).passwordHash;

  //     return res.status(200).json({ user: userResponse, token });
  //   } catch (error: any) {
  //     return res.status(401).json({ message: error.message });
  //   }
  // }
}

export const authController = new AuthController();
