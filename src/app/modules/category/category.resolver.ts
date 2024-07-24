import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category, Product } from '../../shared/types/graphql.schema';
import { CreateCategoryInputDto } from './dtos/create-category.input';
import { UpdateCategoryInputDto } from './dtos/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') { name, parentId }: CreateCategoryInputDto,
  ) {
    if (!parentId) parentId = null;
    return this.categoryService.createCategory({ name, parentId });
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInputDto,
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
