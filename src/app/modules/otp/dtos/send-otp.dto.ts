import { IsEmail, IsEnum, IsString } from 'class-validator';
import { OtpTypes } from '../../../shared/enums/otps.enum';

export class SendOtpInputDto {
  @IsString()
  @IsEnum(OtpTypes)
  otpType: OtpTypes;

  @IsEmail()
  email: string;
}
