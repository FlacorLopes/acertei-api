import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  name: string;
}
