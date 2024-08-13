import { IsEmail, IsString, MinLength } from 'class-validator';

export class PassResetInputDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  otp: string;
}
