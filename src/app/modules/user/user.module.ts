import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [OtpModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
