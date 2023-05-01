import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TriviaContentDto } from 'src/lib/TriviaContent';

export class CreateTriviaDto {
  @IsUUID('4', { each: true })
  categories: string[];

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @ValidateNested()
  @Type(() => TriviaContentDto)
  content: TriviaContentDto;
}

export class UpdateTriviaDto extends PartialType(CreateTriviaDto) {}
