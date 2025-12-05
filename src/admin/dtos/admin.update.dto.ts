import { IsOptional, IsString, IsBoolean, IsEmail } from 'class-validator';

export class UpdateAdminDto {
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
  @IsString()
  admintype?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsString()
  updatedBy?: string;

 }
