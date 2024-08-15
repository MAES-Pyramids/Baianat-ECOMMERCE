import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsString()
  @Field()
  name: string;

  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  parentId: number | null;
}
