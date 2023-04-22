import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class TriviaValue {
  @IsUUID()
  id: string;

  @IsString()
  value: string;
}

class TriviaColumn {
  @IsString()
  key: string;

  @IsString()
  label: string;

  @IsBoolean()
  isValueMasked: boolean;

  @IsOptional()
  @IsString()
  revealingMask?: string;

  @ValidateNested({ each: true })
  @Type(() => TriviaValue)
  values: TriviaValue[];
}

export class TriviaContent {
  @ValidateNested({ each: true })
  @Type(() => TriviaColumn)
  columns: TriviaColumn[];
}
