import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TriviaContent } from 'src/lib/TriviaContent';

export class CreateTriviaDto {
  @IsUUID('4', { each: true })
  categories: string[];

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @ValidateNested()
  @Type(() => TriviaContent)
  content: TriviaContent;

  @IsOptional()
  @IsPositive()
  questionsAmount: number;
}

export class UpdateTriviaDto extends PartialType(CreateTriviaDto) {}
