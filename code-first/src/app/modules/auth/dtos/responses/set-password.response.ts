import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SetPasswordResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}
