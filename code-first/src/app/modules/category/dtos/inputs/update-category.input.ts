import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  parentId: number | null;
}
