import {
  User,
  AuthPayload,
  PassResetResponse,
  SetPasswordResponse,
} from '../../shared/types/graphql.schema';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInputDto } from './dtos/signup-input.dto';
import { PassResetInputDto } from './dtos/reset-pass.input';
import { SetPasswordInputDto } from './dtos/set-pass.input';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { GraphQLAuthGuard } from '../../shared/guards/graphql-authen.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signup(
    @Args('signupInput') signupInput: SignupInputDto,
  ): Promise<User> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthPayload)
  @UseGuards(GraphQLAuthGuard)
  async login(@Context() context): Promise<AuthPayload> {
    return this.authService.login(context.user);
  }

  @Mutation(() => PassResetResponse)
  async generateResetPassJWT(
    @Args('passResetInput') { email, otp }: PassResetInputDto,
  ): Promise<PassResetResponse> {
    return this.authService.generateResetPassJWT(email, otp);
  }

  @Mutation(() => SetPasswordResponse)
  async setPassword(
    @Args('setPasswordInput')
    { passwordResetToken, password }: SetPasswordInputDto,
  ): Promise<SetPasswordResponse> {
    await this.authService.setPassword(passwordResetToken, password);
    return { success: true, message: 'Password set successfully' };
  }
}
