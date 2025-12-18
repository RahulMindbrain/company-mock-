import {
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RecordStatus } from '@prisma/client';

export class UpdateAutonumDto {
   barcodeId!: number;
}
