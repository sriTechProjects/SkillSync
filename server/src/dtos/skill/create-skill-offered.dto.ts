import { IsEnum, IsNotEmpty, IsString, IsInt, Min } from "class-validator";

enum SessionType {
  ONLINE,
  IN_PERSON
}

export class CreateSkillOfferedDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsInt()
  @Min(0)
  creditValue!: number;

  @IsEnum(SessionType)
  @IsNotEmpty()
  sessionType!: SessionType;

  @IsString()
  @IsNotEmpty()
  categoryId!: string;
}