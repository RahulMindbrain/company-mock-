import { IsOptional, IsString, IsEmail, IsNumber, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

export class UpdateAdminDto {
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
  countrycode?: string;

  @IsOptional()
  @IsString()
  mobno1?: string;

  @IsOptional()
  @IsString()
  mobno2?: string;

  @IsOptional()
  @IsString()
  pinno?: string;

  @IsOptional()
  @IsString()
  countryname?: string;

  @IsOptional()
  @IsString()
  statename?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  profileimg?: string;

  @IsOptional()
  @IsString()
  admintype?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  walletbalance?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalwalletadd?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalwithdraw?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totaltransferwallet?: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

}
