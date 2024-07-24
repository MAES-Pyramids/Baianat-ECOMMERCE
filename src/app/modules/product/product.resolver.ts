import { UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../../shared/types/graphql.schema';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UpdateProductInputDto } from './dto/update-product.input';
import { CreateProductInputDto } from './dto/create-product.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JwtAuthenticationGuard } from '../../shared/guards/jwt-authen.guard';
import { JwtAuthorizationGuard } from '../../shared/guards/jwt-author.guard';

@Resolver(() => Product)
@UseGuards(JwtAuthenticationGuard)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  products() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  product(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productService.findOne({ id });
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthorizationGuard)
  @Roles('admin')
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInputDto,
  ) {
    return this.productService.create(createProductInput);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthorizationGuard)
  @Roles('admin')
  updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProductInput') updateProductInput: UpdateProductInputDto,
  ) {
    return this.productService.update(id, updateProductInput);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthorizationGuard)
  @Roles('admin')
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
