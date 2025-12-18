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

export class CreateAutonumDto {
  companyId!: number;

  /**
   * Initial barcode value.
   * Example: 10000 (next product will get 10001)
   */
  barcodeId!: number;
}
