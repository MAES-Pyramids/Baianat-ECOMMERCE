import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Mutation,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Category } from './models/category.model';
import { CategoryService } from './category.service';
import { Product } from '../product/models/product.model';
import { Roles } from '../../shared/decorators/roles.decorator';
import { CreateCategoryInput } from './dtos/inputs/create-category.input';
import { UpdateCategoryInput } from './dtos/inputs/update-category.input';
import { JwtAuthorizationGuard } from '../../shared/guards/jwt-author.guard';
import { JwtAuthenticationGuard } from '../../shared/guards/jwt-authen.guard';

@Resolver(() => Category)
@UseGuards(JwtAuthenticationGuard)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  @UseGuards(JwtAuthorizationGuard)
  @Roles('admin')
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
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
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, updateCategoryInput);
  }

  @Query(() => Category)
  async getCategoryInfo(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Category> {
    return this.categoryService.getCategoryInfo(id);
  }

  @Query(() => [Product])
  async getProductsByCategoryId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Product[]> {
    return this.categoryService.getProductsByCategoryId(id);
  }

  @Query(() => [Category])
  async getTopCategories(): Promise<Category[]> {
    return this.categoryService.getTopCategories();
  }

  @ResolveField(() => [Category])
  async children(@Parent() category: Category): Promise<Category[]> {
    return this.categoryService.getCategoryChildren(category.id);
  }

  @ResolveField(() => Category, { nullable: true })
  async parent(@Parent() category: Category): Promise<Category | null> {
    return category.parentId
      ? this.categoryService.getCategoryInfo(category.parentId)
      : null;
  }

  @ResolveField(() => [Product])
  async products(@Parent() category: Category): Promise<Product[]> {
    return this.categoryService.getProductsByCategoryId(category.id);
  }
}
