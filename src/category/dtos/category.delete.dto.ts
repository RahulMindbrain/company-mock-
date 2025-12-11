import { IsInt } from "class-validator";
import { Type } from "class-transformer";

export class DeleteCategoryDto {
  @IsInt()
  @Type(() => Number)
  id!: number;
}
