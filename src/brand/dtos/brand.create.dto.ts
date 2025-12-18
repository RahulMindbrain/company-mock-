import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
} from "class-validator";

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  brandname!: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  companyId!: number;

  @IsOptional()
  status?: "ACTIVE" | "INACTIVE";

  @IsInt()
  @IsNotEmpty()
  createdById?: number;
}
