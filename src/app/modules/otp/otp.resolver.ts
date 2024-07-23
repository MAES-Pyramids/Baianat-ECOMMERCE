import { Resolver } from '@nestjs/graphql';
import { OtpService } from './otp.service';

@Resolver('Otp')
export class OtpResolver {
  constructor(private readonly otpService: OtpService) {}
}
