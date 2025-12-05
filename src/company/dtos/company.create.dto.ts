import { IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateCompanyDto {

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  websiteUrl?: string;

  @IsOptional()
  @IsString()
  printName?: string;

  @IsOptional()
  @IsString()
  billPrefix?: string;

  @IsOptional()
  @IsDateString()
  beginningDate?: string;

  @IsOptional()
  @IsDateString()
  commencingFrom?: string;

  @IsOptional()
  @IsString()
  addressLine1?: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  contactNo1?: string;

  @IsOptional()
  @IsString()
  contactNo2?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  gstNo?: string;

  @IsOptional()
  @IsString()
  panNo?: string;

  @IsOptional()
  @IsString()
  vatNo?: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsString()
  lightLogo?: string;

  @IsOptional()
  @IsString()
  darkLogo?: string;
}

