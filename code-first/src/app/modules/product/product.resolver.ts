import { UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { Product as prismaProduct } from '@prisma/client';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { CreateProductInput } from './dto/inputs/create-product.input';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { JwtAuthorizationGuard } from '../../shared/guards/jwt-author.guard';
import { JwtAuthenticationGuard } from '../../shared/guards/jwt-authen.guard';
import { LangInterceptor } from '../../shared/interceptors/lang.interceptor';
import { Category } from '../category/models/category.model';
import { IDataloaders } from '../dataloader/dataloader.interface';

@Resolver(() => Product)
@UseGuards(JwtAuthenticationGuard)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  @UseInterceptors(LangInterceptor)
  products() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  @UseInterceptors(LangInterceptor)
  product(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne({ id });
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthorizationGuard)
  @Roles('admin')
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthorizationGuard)
  @Roles('admin')
  updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(id, updateProductInput);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthorizationGuard)
  @Roles('admin')
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }

  @ResolveField(() => [Category])
  async category(
    @Parent() product: prismaProduct,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    return loaders.categoriesLoader.load(product.id);
  }
}
