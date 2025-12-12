import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteBrandDto {
  @IsInt()
  @IsNotEmpty()
  id!: number;

  @IsInt()
  @IsNotEmpty()
  deletedById!: number;
}
