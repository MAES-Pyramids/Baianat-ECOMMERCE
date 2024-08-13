import { IsEmail, IsString, MinLength } from 'class-validator';

export class SetPasswordInputDto {
  @IsString()
  passwordResetToken: string;

  @IsString()
  @MinLength(8)
  password: string;
}
