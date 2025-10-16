import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SuggestCategoryDTO{
    @IsNotEmpty({message: "Name cannot be kept Empty"})
    @IsString()
    @MinLength(2, { message: 'Category name must be at least 2 characters long.' })
    name!: string;
}