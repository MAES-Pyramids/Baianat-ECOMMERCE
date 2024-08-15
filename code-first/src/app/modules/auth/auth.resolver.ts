import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInput } from './dtos/inputs/signup-input';
import { PassResetInput } from './dtos/inputs/reset-pass.input';
import { SetPasswordInput } from './dtos/inputs/set-pass.input';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { GraphQLAuthGuard } from '../../shared/guards/graphql-authen.guard';
import { User } from '../user/models/user.model';
import { AuthPayload } from './dtos/responses/auth.response';
import { PassResetResponse } from './dtos/responses/pass-reset.response';
import { SetPasswordResponse } from './dtos/responses/set-password.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signup(@Args('signupInput') signupInput: SignupInput): Promise<User> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthPayload)
  @UseGuards(GraphQLAuthGuard)
  async login(@Context() context): Promise<AuthPayload> {
    return this.authService.login(context.user);
  }

  @Mutation(() => PassResetResponse)
  async generateResetPassJWT(
    @Args('passResetInput') { email, otp }: PassResetInput,
  ): Promise<PassResetResponse> {
    return this.authService.generateResetPassJWT(email, otp);
  }

  @Mutation(() => SetPasswordResponse)
  async setPassword(
    @Args('setPasswordInput')
    { passwordResetToken, password }: SetPasswordInput,
  ): Promise<SetPasswordResponse> {
    await this.authService.setPassword(passwordResetToken, password);
    return { success: true, message: 'Password set successfully' };
  }
}
