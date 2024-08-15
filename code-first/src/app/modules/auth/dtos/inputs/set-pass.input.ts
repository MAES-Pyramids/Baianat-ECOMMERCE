import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class SetPasswordInput {
  @IsString()
  @Field()
  passwordResetToken: string;

  @IsString()
  @MinLength(8)
  @Field()
  password: string;
}
