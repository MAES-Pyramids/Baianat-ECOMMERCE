import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, Args, Int } from '@nestjs/graphql';
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
    const { name, parentId } = createCategoryInput;
    return this.categoryService.createCategory({
      name,
      parentId: parentId ?? null,
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
}
