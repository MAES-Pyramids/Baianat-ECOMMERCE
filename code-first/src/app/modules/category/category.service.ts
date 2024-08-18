import { map } from 'ramda';
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

  // Note: I opted for the product-centric approach for querying categories
  // instead of delegating to CategoryService. Querying categories by product
  // IDs directly simplifies the process, as the alternative would require
  // additional iteration due to one category potentially containing more than
  // one of the required id.
  async getProductCategoriesByBatch(productIds: number[]) {
    const productsWithCategories = await this.prismaService.product.findMany({
      where: { id: { in: productIds } },
      include: { category: true },
    });

    const categoryMap = productsWithCategories.reduce<
      Record<number, Category | null>
    >((acc, product) => {
      acc[product.id] = product.category || null;
      return acc;
    }, {});

    return map((productId) => categoryMap[productId], productIds);
  }
  // async getProductCategoriesByBatch(productIds: number[]) {
  //   const categoriesByProduct = await this.prismaService.category.findMany({
  //     where: { products: { some: { id: { in: productIds } } } },
  //     include: { products: true },
  //   });

  //   const groupedCategories = productIds.reduce<
  //     Record<number, Category | null>
  //   >((acc, productId) => {
  //     const category = categoriesByProduct.find((category) =>
  //       category.products.some((product) => product.id === productId),
  //     );
  //     acc[productId] = category || null;
  //     return acc;
  //   }, {});

  //   return map((productId) => groupedCategories[productId], productIds);
  // }
}
