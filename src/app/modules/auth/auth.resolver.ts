import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dtos/login-input.dto';
import { SignupInputDto } from './dtos/signup-input.dto';
import { AuthPayload, User } from '../../shared/types/graphql.schema';
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
  async login(
    @Args('loginInput') loginInput: LoginInputDto,
    @Context() context,
  ): Promise<AuthPayload> {
    return this.authService.login(context.user);
  }
}
