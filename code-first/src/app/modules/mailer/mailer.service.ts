import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { SendEmailParams } from './interfaces/email-params.interface';

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  private readonly mailFormats = {
    Verify_Account: {
      subject: 'Verify your account',
      text: 'Your OTP is {{OTP}}',
    },
    Reset_Password: {
      subject: 'Reset your password',
      text: 'Your OTP is {{OTP}}',
    },
  };

  // @OnEvent('otp.sent')
  async sendEmail({ email, otp, mailType }: SendEmailParams): Promise<void> {
    const format = this.mailFormats[mailType];
    if (!format) throw new Error('Invalid mail type');

    const text = format.text.replace('{{OTP}}', otp);

    const mailOptions = {
      from: process.env.MAILER_EMAIL,
      to: email,
      text,
      subject: format.subject,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Error sending email: ${error.message}`);
    }
  }
}
