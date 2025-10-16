import { IsString, IsOptional, IsUrl, MinLength, IsPhoneNumber, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  username?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Profile picture must be a valid URL.' })
  profilePicture?: string;

  @IsOptional()
  @IsPhoneNumber('IN', { message: 'Please provide a valid Indian phone number.' })
  phoneNumber?: string;
}
