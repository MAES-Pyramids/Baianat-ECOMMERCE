import { Prisma } from '@prisma/client';
import { OtpService } from '../otp/otp.service';
import { OtpTypes } from '../../shared/enums/otps.enum';
import { User } from '../../shared/types/graphql.schema';
import { DatabaseService } from '../database/database.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private otpService: OtpService,
    private readonly prismaService: DatabaseService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({});
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.findUnique({ where });
  }

  async create(createUserInput: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data: createUserInput,
    });
  }

  async update(
    id: number,
    updateUserInput: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  async remove(id: number): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }

  async verifyEmail(email: string, otp: string): Promise<User> {
    const user = await this.findOne({ email });
    if (!user) throw new HttpException('email not found', HttpStatus.NOT_FOUND);

    const valid = await this.otpService.verifyOtp(
      user.id,
      otp,
      OtpTypes.VERIFY_ACCOUNT,
    );

    if (!valid) throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    else return await this.update(user.id, { isVerified: true });
  }

  async sendOtp(email: string, otpType: OtpTypes): Promise<void> {
    const user = await this.findOne({ email });
    if (!user) throw new HttpException('email not found', HttpStatus.NOT_FOUND);

    await this.otpService.createAndSendOtp(user.id, email, otpType);
  }
}
