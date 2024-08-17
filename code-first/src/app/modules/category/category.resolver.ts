import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Mutation,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { Category } from './models/category.model';
import { Category as prismaCategory } from '@prisma/client';
import { CategoryService } from './category.service';
import { Product } from '../product/models/product.model';
import { Roles } from '../../shared/decorators/roles.decorator';
import { CreateCategoryInput } from './dtos/inputs/create-category.input';
import { UpdateCategoryInput } from './dtos/inputs/update-category.input';
import { JwtAuthorizationGuard } from '../../shared/guards/jwt-author.guard';
import { JwtAuthenticationGuard } from '../../shared/guards/jwt-authen.guard';
import { IDataloaders } from '../dataloader/dataloader.interface';

@Resolver(() => Category)
@UseGuards(JwtAuthenticationGuard)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => Category)
  async getCategoryInfo(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.getCategoryInfo(id);
  }

  @Query(() => [Product])
  async getProductsByCategoryId(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.getProductsByCategoryId(id);
  }

  @Query(() => [Category])
  async getTopCategories(): Promise<Category[]> {
    return this.categoryService.getTopCategories();
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthorizationGuard)
  @Roles('admin')
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    const parentId =
      createCategoryInput.parentId && createCategoryInput.parentId !== 0
        ? createCategoryInput.parentId
        : null;

    return this.categoryService.createCategory({
      ...createCategoryInput,
      parentId,
    });
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthorizationGuard)
  @Roles('admin')
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryInput);
  }

  @ResolveField(() => [Category])
  async children(@Parent() category: prismaCategory) {
    return this.categoryService.getCategoryChildren(category.id);
  }

  @ResolveField(() => Category, { nullable: true })
  async parent(@Parent() category: prismaCategory) {
    return category.parentId
      ? this.categoryService.getCategoryInfo(category.parentId)
      : null;
  }

  @ResolveField(() => [Product])
  async products(
    @Parent() category: prismaCategory,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    return loaders.productsLoader.load(category.id);
  }
}
