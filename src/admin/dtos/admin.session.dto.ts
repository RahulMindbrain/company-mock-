import { IsEmail, IsNotEmpty, IsString,IsOptional,IsBoolean } from "class-validator";

//will be used for user signin
export class CreateSessionDto {
  @IsEmail({}, { message: "Email is required" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @IsString({ message: "Password is required" })
  @IsNotEmpty({ message: "Password is required" })
  password!: string;
}



export class UpdateAdminSessionDto {


  @IsOptional()
  @IsBoolean()
  valid?: boolean;
}
