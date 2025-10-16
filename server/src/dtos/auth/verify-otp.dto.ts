import { IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator";

export class VerifyOtpDto {
  @IsPhoneNumber("IN")
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: "OTP must be 6 digits." })
  code!: string;
}
