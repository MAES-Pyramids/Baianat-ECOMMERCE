import { groupBy, map } from 'ramda';
import { Prisma } from '@prisma/client';
import { Product } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProductInput } from './dto/inputs/create-product.input';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: DatabaseService) {}

  async findAll(): Promise<Product[]> {
    const locale = 'en';
    const products = await this.prismaService.product.findMany({
      include: { translations: { where: { locale } } },
    });
    return products.map((product) => {
      const { translations, ...productData } = product;
      const translation = translations[0] || {};
      return { ...productData, ...translation };
    });
  }

  async findOne(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    // const locale = this.languageContextProvider.getLanguage();
    const locale = 'en';
    const product = await this.prismaService.product.findUnique({
      where,
      include: { translations: { where: { locale } } },
    });
    const { translations, ...productData } = product;
    const translation = translations[0] || {};
    return { ...productData, ...translation };
  }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const { translations, ...productData } = createProductInput;
    return this.prismaService.product.create({
      data: { ...productData, translations: { create: translations } },
    });
  }

  async update(
    id: number,
    updateProductInput: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: updateProductInput,
      include: { category: true },
    });
  }

  async remove(id: number): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
      include: { category: true },
    });
  }

  async getCategoryProductsByBatch(categoryIds: number[]) {
    const products = await this.prismaService.product.findMany({
      where: { categoryId: { in: categoryIds } },
    });
    const groupedProducts = groupBy((product) => product.categoryId, products);
    return map((categoryId) => groupedProducts[categoryId], categoryIds);
  }
}
