import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { TranscodeConsumer } from './mailer-queue.consumer';

@Module({
  providers: [MailerService, TranscodeConsumer],
})
export class MailerModule {}
