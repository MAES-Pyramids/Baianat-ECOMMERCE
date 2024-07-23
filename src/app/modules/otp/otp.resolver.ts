import { OtpService } from './otp.service';
import { SendOtpInputDto } from './dtos/send-otp.dto';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DatabaseService } from '../database/database.service';
import { SendOtpResponse } from '../../shared/types/graphql.schema';

@Resolver()
export class OtpResolver {
  constructor(
    private otpService: OtpService,
    private readonly prismaService: DatabaseService,
  ) {}

  @Mutation(() => SendOtpResponse)
  async sendOtp(
    @Args('sendOtpInput') sendOtpInput: SendOtpInputDto,
  ): Promise<SendOtpResponse> {
    const { email, otpType } = sendOtpInput;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (!user || !user.id) return { success: false, message: 'User not found' };

    const valid = await this.otpService.createAndSendOtp(
      user.id,
      email,
      otpType,
    );

    if (valid) return { success: true, message: 'OTP sent' };
    else return { success: false, message: 'Failed to send OTP' };
  }
}
