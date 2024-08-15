import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { Category } from '../../category/models/category.model';
import { Translation } from '../../language/models/translation.model';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => GraphQLJSON, { nullable: true })
  specifications?: any;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => [String], { nullable: 'itemsAndList' })
  images?: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Category)
  category: Category;

  @Field(() => [Translation], { nullable: 'itemsAndList' })
  translations?: Translation[];
}
