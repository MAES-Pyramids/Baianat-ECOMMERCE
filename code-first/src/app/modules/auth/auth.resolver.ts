import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInput } from './dtos/inputs/signup-input';
import { PassResetInput } from './dtos/inputs/reset-pass.input';
import { SetPasswordInput } from './dtos/inputs/set-pass.input';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { GraphQLAuthGuard } from '../../shared/guards/graphql-authen.guard';
import { User } from '../user/models/user.model';
import { AuthResponse } from './dtos/responses/auth.response';
import { PassResetResponse } from './dtos/responses/pass-reset.response';
import { SetPasswordResponse } from './dtos/responses/set-password.response';
import { LoginInput } from './dtos/inputs/login-input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<Partial<User>> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse)
  @UseGuards(GraphQLAuthGuard)
  async login(
    @Context() context,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('loginInput') _: LoginInput,
  ): Promise<AuthResponse> {
    return this.authService.login(context.user);
  }

  @Mutation(() => PassResetResponse)
  async generateResetPassJWT(
    @Args('passResetInput') passResetInput: PassResetInput,
  ): Promise<PassResetResponse> {
    const { email, otp } = passResetInput;
    return this.authService.generateResetPassJWT(email, otp);
  }

  @Mutation(() => SetPasswordResponse)
  async setPassword(
    @Args('setPasswordInput') setPasswordInput: SetPasswordInput,
  ): Promise<SetPasswordResponse> {
    const { passwordResetToken, password } = setPasswordInput;
    await this.authService.setPassword(passwordResetToken, password);
    return { success: true, message: 'Password set successfully' };
  }
}
