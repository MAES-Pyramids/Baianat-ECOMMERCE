import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { BullModule } from '@nestjs/bull';
import { MAILER_QUEUE } from '../../shared/constants/bull-queues.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: MAILER_QUEUE,
    }),
  ],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
