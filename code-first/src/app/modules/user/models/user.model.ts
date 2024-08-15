import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  role: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Boolean)
  isVerified: boolean;

  @Field(() => Boolean)
  isSuspended: boolean;
}
