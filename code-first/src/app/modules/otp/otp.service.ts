import * as bcrypt from 'bcrypt';
import { OtpTypes } from '@shared/enums/otps.enum';
import { DatabaseService } from '../database/database.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

const INTERNAL_SERVER_ERROR = HttpStatus.INTERNAL_SERVER_ERROR;

@Injectable()
export class OtpService {
  constructor(
    private eventEmitter: EventEmitter2,
    private readonly prismaService: DatabaseService,
  ) {}

  async createOtp(userId: number, otpType: OtpTypes): Promise<string> {
    try {
      const random = Math.floor(100000 + Math.random() * 900000);
      const salt = await bcrypt.genSalt(10);
      const otp = await bcrypt.hash(random.toString(), salt);

      const expiresAt = new Date(
        Date.now() + parseInt(process.env.OTP_EXPIRY_MIN, 10) * 60000,
      );

      await this.prismaService.otp.upsert({
        where: { userId },
        update: { otp, otpType, expiresAt, createdAt: new Date() },
        create: { otp, userId, otpType, expiresAt, createdAt: new Date() },
      });

      return random.toString();
    } catch (error) {
      throw new HttpException('Error creating OTP', INTERNAL_SERVER_ERROR);
    }
  }

  async verifyOtp(
    userId: number,
    otp: string,
    otpType: OtpTypes,
  ): Promise<boolean> {
    try {
      const storedOtp = await this.prismaService.otp.findFirst({
        where: { userId, otpType, expiresAt: { gt: new Date() } },
      });

      if (!storedOtp || !(await bcrypt.compare(otp, storedOtp.otp)))
        return false;
      await this.prismaService.otp.delete({ where: { id: storedOtp.id } });

      return true;
    } catch (error) {
      throw new HttpException('Error verifying OTP', INTERNAL_SERVER_ERROR);
    }
  }

  async createAndSendOtp(
    userId: number,
    email: string,
    otpType: OtpTypes,
  ): Promise<void> {
    const otp = await this.createOtp(userId, otpType);

    this.eventEmitter.emit('otp.sent', {
      email,
      otp,
      mailType: otpType,
    });
  }
}
