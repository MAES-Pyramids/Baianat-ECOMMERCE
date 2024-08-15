import {
  IsInt,
  IsArray,
  IsString,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';
import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  title?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsObject()
  @Field(() => GraphQLJSON, { nullable: true })
  specifications?: any;

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  price?: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  quantity?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  images?: string[];

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  categoryId?: number;
}
