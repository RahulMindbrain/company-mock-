import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';


export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  brandname!: string;

  @IsOptional()
  status?: "ACTIVE" | "INACTIVE";

  @IsInt()
  @IsNotEmpty()
  createdById?: number;
}
