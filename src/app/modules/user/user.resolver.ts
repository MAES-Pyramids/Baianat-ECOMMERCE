import { UserService } from './user.service';
import { User } from '../../shared/types/graphql.schema';
import { UpdateUserInputDto } from './dto/update-user.input';
import { CreateUserInputDto } from './dto/create-user.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation('createUser')
  create(
    @Args('createUserInput') createUserInput: CreateUserInputDto,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation('updateUser')
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInputDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.remove(id);
  }
}
