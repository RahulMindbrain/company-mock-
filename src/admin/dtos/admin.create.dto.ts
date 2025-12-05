import { Type } from "class-transformer";
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsEmail,
} from "class-validator";

export class CreateAdminDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  companyId?: number;

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  mobno1?: string;

  @IsOptional()
  @IsString()
  mobno2?: string;

  @IsOptional()
  @IsString()
  profileimg?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
