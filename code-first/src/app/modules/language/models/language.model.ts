import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Language {
  @Field(() => Int)
  id: number;

  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  isDefault: boolean;
}
