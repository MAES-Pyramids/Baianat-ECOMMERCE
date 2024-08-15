import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SendOtpResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}
