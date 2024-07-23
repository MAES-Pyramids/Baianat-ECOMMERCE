import { OtpService } from './otp.service';
import { SendOtpInputDto } from './dtos/send-otp.dto';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DatabaseService } from '../database/database.service';
import { SendOtpResponse } from '../../shared/types/graphql.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Resolver()
export class OtpResolver {
  constructor(
    private otpService: OtpService,
    private eventEmitter: EventEmitter2,
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

    const otp = await this.otpService.createOtp(user.id, otpType);
    const valid = await this.eventEmitter.emitAsync('otp.sent', {
      email,
      otp,
      mailType: otpType,
    });

    if (valid) return { success: true, message: 'OTP sent' };
    else return { success: false, message: 'Failed to send OTP' };
  }
}
