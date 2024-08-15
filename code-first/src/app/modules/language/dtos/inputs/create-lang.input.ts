import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateLanguageInput {
  @IsString()
  @Field()
  code: string;

  @IsString()
  name: string;
}
