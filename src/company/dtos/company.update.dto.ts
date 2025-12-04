import { IsOptional, IsString, IsDateString, IsInt } from 'class-validator';

export class UpdateCompanyDto {

  @IsInt()
  id!:number;

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


/*
model Company {
  id              Int       @id @default(autoincrement())
  
  companyName     String?
  websiteUrl      String?
  printName       String?
  billPrefix      String?          

  beginningDate   DateTime?
  commencingFrom  DateTime?

  addressLine1    String?
  addressLine2    String?

  country         String?
  state           String?

  contactNo1      String?
  contactNo2      String?

  email           String?
  website         String?

  gstNo           String?
  panNo           String?
  vatNo           String?
  fax             String?

  lightLogo       String?         
  darkLogo        String?         

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

*/