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

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  productname?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  brandId?: number;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  hsncode?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  dp?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  mrp?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  taxPercent?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  sre?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  BV?: number;

  @IsOptional()
  @IsString()
  mainImg?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  otherImgs?: string[];

  @IsOptional()
  @IsEnum(RecordStatus)
  status?: RecordStatus;
}
