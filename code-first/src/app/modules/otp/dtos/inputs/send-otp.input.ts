import { IsEmail, IsEnum, IsString } from 'class-validator';
import { OtpTypes } from '../../../../shared/enums/otps.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendOtpInput {
  @IsString()
  @IsEnum(OtpTypes)
  @Field()
  otpType: OtpTypes;

  @IsEmail()
  @Field()
  email: string;
}
