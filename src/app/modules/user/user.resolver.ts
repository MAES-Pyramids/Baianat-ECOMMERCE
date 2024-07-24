import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../shared/types/graphql.schema';
import { UpdateUserInputDto } from './dtos/update-user.input';
import { CreateUserInputDto } from './dtos/create-user.input';
import { Roles } from '../../shared/decorators/roles.decorator';
import { VerifyEmailInputDto } from './dtos/verify-email.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JwtAuthenticationGuard } from '../../shared/guards/jwt-authen.guard';
import { JwtAuthorizationGuard } from '../../shared/guards/jwt-author.guard';

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
    @Args('createUserInput') createUserInput: CreateUserInputDto,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @UseGuards(JwtAuthenticationGuard, JwtAuthorizationGuard)
  @Roles('admin')
  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInputDto,
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
    @Args('verifyEmailInput') { email, otp }: VerifyEmailInputDto,
  ): Promise<User> {
    return this.userService.verifyEmail(email, otp);
  }
}
