import { mailTypes } from '../../../shared/enums/mails.enum';

export interface SendEmailParams {
  email: string;
  otp: string;
  mailType: mailTypes;
}
