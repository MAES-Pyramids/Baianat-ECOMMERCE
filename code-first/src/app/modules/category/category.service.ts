import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';
import { Category, Product } from '../../shared/types/graphql.schema';
import { CreateCategoryInputDto } from './dtos/create-category.input';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: DatabaseService) {}

  async createCategory(data: CreateCategoryInputDto): Promise<Category> {
    return await this.prismaService.category.create({
      data: {
        name: data.name,
        parentId: data.parentId,
      },
    });
  }

  async updateCategory(
    id: number,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.prismaService.category.update({ where: { id }, data });
  }

  async getTopCategories(): Promise<Category[]> {
    return this.prismaService.category.findMany({
      where: { parentId: null },
      include: { children: true },
    });
  }

  async getCategoryInfo(id: number): Promise<Category> {
    return this.prismaService.category.findUnique({
      where: { id },
      include: { children: true, parent: true },
    });
  }

  async getProductsByCategoryId(categoryId: number): Promise<Product[]> {
    return this.prismaService.product.findMany({
      where: { categoryId },
      include: { category: true },
    });
  }
}
