import { Prisma } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../shared/types/graphql.schema';
import { CreateUserInputDto } from './dtos/create-user.input';
import { DatabaseService } from '../database/database.service';
import { OtpService } from '../otp/otp.service';
import { OtpTypes } from '../../shared/enums/otps.enum';

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

  update(id: number, updateUserInput: Partial<User>): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  create(createUserInput: CreateUserInputDto): Promise<User> {
    return this.prismaService.user.create({
      data: createUserInput,
    });
  }

  remove(id: number): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }

  async verifyEmail(id: number, otp: string): Promise<User> {
    const valid = await this.otpService.verifyOtp(
      id,
      otp,
      OtpTypes.VERIFY_ACCOUNT,
    );

    if (!valid) throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    else return await this.update(id, { isVerified: true });
  }
}
