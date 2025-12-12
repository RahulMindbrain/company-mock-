import { IsEnum, IsOptional, IsString, IsInt, IsNotEmpty } from 'class-validator';


export class UpdateBrandDto {
  @IsString()
  @IsOptional()
  brandname?: string;

  
  @IsOptional()
  status?: "ACTIVE" | "INACTIVE";

  @IsInt()
  @IsNotEmpty()
  updatedById?: number;
}
