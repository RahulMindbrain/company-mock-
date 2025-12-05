import { IsInt } from "class-validator";
import { Type } from "class-transformer";

export class DeleteAdminDto {
  @IsInt()
  @Type(() => Number)
  id!: number;
}
