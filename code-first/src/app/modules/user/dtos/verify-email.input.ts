import { IsEmail, IsString, MinLength } from 'class-validator';

export class VerifyEmailInputDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  otp: string;
}
