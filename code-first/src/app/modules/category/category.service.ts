import { Prisma } from '@prisma/client';
import { Category } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateCategoryInput } from './dtos/inputs/create-category.input';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: DatabaseService) {}

  async createCategory(data: CreateCategoryInput): Promise<Category> {
    const { parentId, name } = data;
    return await this.prismaService.category.create({
      data: { name, parentId },
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
    });
  }

  async getCategoryInfo(id: number): Promise<Category> {
    return this.prismaService.category.findUnique({
      where: { id },
    });
  }

  async getCategoryChildren(id: number): Promise<Category[]> {
    return this.prismaService.category.findMany({
      where: { parentId: id },
    });
  }

  async getProductsByCategoryId(
    categoryId: number,
  ): Promise<Partial<Product[]>> {
    return this.prismaService.product.findMany({ where: { categoryId } });
  }
}
