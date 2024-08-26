import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  name: string;

  @Field(() => Int)
  employeeId: number;
}
