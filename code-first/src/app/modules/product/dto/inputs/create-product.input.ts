import {
  IsInt,
  IsArray,
  IsString,
  IsNumber,
  IsObject,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Field, Float, InputType, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateProductInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @IsOptional()
  @IsObject()
  @Field(() => GraphQLJSON, { nullable: true })
  specifications?: any;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Float)
  price: number;

  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  quantity: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  images?: string[];

  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  categoryId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTranslationInput)
  @Field(() => [CreateTranslationInput], { nullable: true })
  translations: CreateTranslationInput[];
}

@InputType()
export class CreateTranslationInput {
  @IsString()
  @IsEnum(['ar', 'fr'], { message: 'we support only ar or fr translations' })
  @Field()
  locale: string;

  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  description: string;
}
