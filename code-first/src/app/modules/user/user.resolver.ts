import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SendOtpInput } from '../otp/dtos/inputs/send-otp.input';
import { UpdateUserInput } from './dtos/inputs/update-user.input';
import { CreateUserInput } from './dtos/inputs/create-user.input';
import { Roles } from '../../shared/decorators/roles.decorator';
import { VerifyEmailInput } from './dtos/inputs/verify-email.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SendOtpResponse } from '@modules/otp/dtos/responses/send-otp.response';
import { User } from '@modules/user/models/user.model';

import { JwtAuthorizationGuard } from '../../shared/guards/jwt-author.guard';
import { JwtAuthenticationGuard } from '../../shared/guards/jwt-authen.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthenticationGuard, JwtAuthorizationGuard)
  @Roles('admin')
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard, JwtAuthorizationGuard)
  @Roles('admin')
  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findOne({ id });
  }

  @UseGuards(JwtAuthenticationGuard, JwtAuthorizationGuard)
  @Roles('admin')
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @UseGuards(JwtAuthenticationGuard, JwtAuthorizationGuard)
  @Roles('admin')
  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(id, updateUserInput);
  }

  @UseGuards(JwtAuthenticationGuard, JwtAuthorizationGuard)
  @Roles('admin')
  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.remove(id);
  }

  @Mutation(() => User)
  async verifyEmail(
    @Args('verifyEmailInput') { email, otp }: VerifyEmailInput,
  ): Promise<User> {
    return this.userService.verifyEmail(email, otp);
  }

  @Mutation(() => SendOtpResponse)
  async sendOtp(
    @Args('sendOtpInput') { email, otpType }: SendOtpInput,
  ): Promise<SendOtpResponse> {
    await this.userService.sendOtp(email, otpType);
    return { success: true, message: 'OTP sent' };
  }
}
