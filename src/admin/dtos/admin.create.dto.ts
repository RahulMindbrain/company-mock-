import { Type } from "class-transformer";
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsEmail,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
  Matches,
} from "class-validator";

Validate;
@ValidatorConstraint({ name: "PasswordsMatch", async: false })
export class PasswordsMatch implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const obj = args.object as any;
    return obj.password === obj.passwordconfirmation;
  }

  defaultMessage(args: ValidationArguments) {
    return "Passwords do not match";
  }
}

//will used for user signup
export class CreateAdminDto {
  @IsNumber()
  @Type(() => Number)
  companyId?: number;

  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  
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

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+=])[A-Za-z\d!@#$%^&*()+=]{8,}$/,
    {
      message:
        "Password must contain uppercase, lowercase, number, special character, and no spaces or _-.",
    }
  )
  password!: string;

  @IsOptional()
  @IsString()
  passwordconfirmation?: string;

  @Validate(PasswordsMatch)
  checkPasswords?: string;
}

/*

    Visual Illustration

         Incoming DTO
               |
               v
  ┌──────────────────────────────┐
  │ Validate password (@Matches) │
  └──────────────────────────────┘
               |
               | ✔︎ Strong password?
               |--- No → return password error
               |
               v
  ┌─────────────────────────────────────────┐
  │ Validate passwordConfirmation (optional)│
  └─────────────────────────────────────────┘
               |
               v
  ┌───────────────────────────────────────┐
  │ Run PasswordsMatch (compare both)     │
  └───────────────────────────────────────┘
               |
               | ✔︎ Same?
               |--- No → return "Passwords do not match"
               |
               v
         Everything valid → OK


*/
