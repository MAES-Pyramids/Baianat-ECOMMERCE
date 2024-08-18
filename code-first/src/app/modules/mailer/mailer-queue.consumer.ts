import { Job } from 'bull';
import { MailerService } from './mailer.service';
import { Process, Processor } from '@nestjs/bull';
import { MAILER_QUEUE } from '../../shared/constants/bull-queues.constants';
import { SendEmailParams } from './interfaces/email-params.interface';
import { Logger } from '@nestjs/common';

@Processor(MAILER_QUEUE)
export class TranscodeConsumer {
  constructor(private mailerService: MailerService) {}
  private readonly logger = new Logger(TranscodeConsumer.name);

  @Process('send-otp')
  async sendOtp(job: Job<SendEmailParams>) {
    const { email, otp, mailType } = job.data;
    this.logger.log(`sending otp for job: ${job.id} to ${email}`);
    await this.mailerService.sendEmail({ email, otp, mailType });
  }
}
