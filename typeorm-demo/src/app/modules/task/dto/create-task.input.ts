import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @IsString()
  @Field()
  name: string;

  @IsNumber()
  @Field(() => Int)
  employeeId: number;
}
