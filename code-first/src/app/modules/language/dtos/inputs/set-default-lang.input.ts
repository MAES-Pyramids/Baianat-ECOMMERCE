import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SetDefaultLanguageInput {
  @IsString()
  @Field()
  code: string;
}
