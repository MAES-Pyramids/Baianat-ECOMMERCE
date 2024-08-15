import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PassResetResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  passwordResetToken?: string;
}
