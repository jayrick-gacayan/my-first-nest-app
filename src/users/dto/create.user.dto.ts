import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
  NotEquals,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchPasswords', async: false })
class MatchPasswordsConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const object = args.object as any;
    return confirmPassword === object.password;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    return 'Confirm password must match password';
  }
}

export class CreateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Password must contain at least one uppercase letter, one number, and one special character',
  })
  password?: string;

  @IsString()
  @Validate(MatchPasswordsConstraint)
  confirmPassword: string;

  @IsEnum(Role)
  @NotEquals(Role)
  role: Role;

  @IsOptional()
  @IsPhoneNumber()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  defaultLanguage: string;
}
