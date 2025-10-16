import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsEmail({}, { message: "Please provide a valid email address." })
  @IsNotEmpty({ message: "Email is required." })
  email!: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long." })
  @IsNotEmpty({ message: "Password is required." })
  password!: string;
}
