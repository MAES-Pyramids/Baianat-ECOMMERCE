import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpService } from '../otp/otp.service';
import { LoginInputDto } from './dtos/login-input.dto';
import { OtpTypes } from '../../shared/enums/otps.enum';
import { SignupInputDto } from './dtos/signup-input.dto';

import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import {
  AuthPayload,
  PassResetPayload,
  User,
} from '../../shared/types/graphql.schema';
import { GraphQLAuthGuard } from '../../shared/guards/graphql-authen.guard';
import { PassResetInputDto } from './dtos/reset-pass.input';

@Resolver()
export class AuthResolver {
  constructor(
    private otpService: OtpService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => AuthPayload)
  async signup(
    @Args('signupInput') signupInput: SignupInputDto,
  ): Promise<User> {
    const user = await this.authService.signup(signupInput);

    await this.otpService.createAndSendOtp(
      user.id,
      user.email,
      OtpTypes.VERIFY_ACCOUNT,
    );

    return user;
  }

  @Mutation(() => AuthPayload)
  @UseGuards(GraphQLAuthGuard)
  async login(
    @Args('loginInput') loginInput: LoginInputDto,
    @Context() context,
  ): Promise<AuthPayload> {
    return this.authService.login(context.user);
  }

  @Mutation(() => PassResetPayload)
  async generateResetPassJWT(
    @Args('passResetInput') { email, otp }: PassResetInputDto,
  ): Promise<PassResetPayload> {
    const passToken = await this.authService.generateResetPassJWT(email, otp);
    return { success: true, passToken };
  }
}
