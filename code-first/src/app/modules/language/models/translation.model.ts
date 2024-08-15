import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../../product/models/product.model';

@ObjectType()
export class Translation {
  @Field(() => Int)
  id: number;

  @Field()
  locale: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Product)
  product: Product;
}
