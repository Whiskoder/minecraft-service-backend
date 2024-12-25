import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';

import { MemoryUnit } from '@modules/minecraft-server/enums/memory-unit.enum';

export class CreateMinecraftServerDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Only letters and spaces are allowed',
  })
  name: string;

  @IsString()
  @Matches(/^\d+\.\d+\.\d+$/, {
    message: 'Invalid version format. Expected format: x.x.x',
  })
  version: string;

  @IsEnum(MemoryUnit)
  @IsOptional()
  maxMemoryUnit: MemoryUnit;

  @IsEnum(MemoryUnit)
  @IsOptional()
  minMemoryUnit: MemoryUnit;

  @IsInt()
  @IsPositive()
  @IsOptional()
  minMemory: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  maxMemory: number;
}
