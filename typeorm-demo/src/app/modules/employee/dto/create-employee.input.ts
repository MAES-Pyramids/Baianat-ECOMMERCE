import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @IsString()
  @Field()
  name: string;

  @IsNumber()
  @Field(() => Int)
  age: number;

  @IsString()
  @Field()
  address: string;
}
