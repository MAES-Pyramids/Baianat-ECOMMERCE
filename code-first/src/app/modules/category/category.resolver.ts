import { UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Category } from './models/category.model';
import { Product } from '../product/models/product.model';
import { CreateCategoryInput } from './dtos/inputs/create-category.input';
import { UpdateCategoryInput } from './dtos/inputs/update-category.input';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthorizationGuard } from '../../shared/guards/jwt-author.guard';
import { JwtAuthenticationGuard } from '../../shared/guards/jwt-authen.guard';

@Resolver(() => Category)
@UseGuards(JwtAuthenticationGuard)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Mutation(() => Category)
  @UseGuards(JwtAuthorizationGuard)
  @Roles('admin')
  async createCategory(
    @Args('createCategoryInput') { name, parentId }: CreateCategoryInput,
  ) {
    if (!parentId) parentId = null;
    return this.categoryService.createCategory({ name, parentId });
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

  @Query(() => Category)
  async getCategoryInfo(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.getCategoryInfo(id);
  }

  @Query(() => [Product])
  async getProductsByCategoryId(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.getProductsByCategoryId(id);
  }

  @Query(() => [Category])
  async getTopCategories() {
    return this.categoryService.getTopCategories();
  }
}
