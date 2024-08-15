import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../../product/models/product.model';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  parentId?: number;

  @Field(() => Category, { nullable: true })
  parent?: Category;

  @Field(() => [Category], { nullable: 'itemsAndList' })
  children?: Category[];

  @Field(() => [Product], { nullable: 'itemsAndList' })
  products?: Product[];
}
