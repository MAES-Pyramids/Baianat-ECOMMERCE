import { UsersService } from './users.service';
import { User } from '../../shared/types/graphql.schema';
import { UpdateUserInputDto } from './dtos/update-user.input';
import { CreateUserInputDto } from './dtos/create-user.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JwtAuthenticationGuard } from '../../shared/guards/jwt-authen.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthorizationGuard } from '../../shared/guards/jwt-author.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

@Resolver(() => User)
@UseGuards(JwtAuthenticationGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthorizationGuard)
  @Roles('admin')
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findOne({ id });
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInputDto,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInputDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.remove(id);
  }
}
