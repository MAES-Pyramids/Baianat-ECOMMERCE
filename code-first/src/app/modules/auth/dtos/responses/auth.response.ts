import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@modules/user/models/user.model';

@ObjectType()
export class AuthResponse {
  @Field()
  user: User;

  @Field()
  accessToken: string;
}
