import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class TriviaValueDto {
  @IsString()
  value: string;
}

class TriviaColumnDto {
  @IsString()
  label: string;

  @IsBoolean()
  isValueMasked: boolean;

  @IsOptional()
  @IsString()
  revealingMask?: string;

  @ValidateNested({ each: true })
  @Type(() => TriviaValueDto)
  @ArrayMinSize(10)
  values: TriviaValueDto[];
}

export class TriviaContentDto {
  @ValidateNested({ each: true })
  @Type(() => TriviaColumnDto)
  @ArrayMinSize(1)
  columns: TriviaColumnDto[];
}
