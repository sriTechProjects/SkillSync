import { IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class RequestOtpDto {
  @IsPhoneNumber('IN', { message: 'Please provide a valid Indian phone number.' })
  @IsNotEmpty({ message: 'Phone number should not be empty.' })
  phoneNumber!: string;
}