import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
// import { Product } from './models/product.model';
import { Product } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { LanguageContextProvider } from '../../shared/services/language-context.service';
import { Category } from '../category/models/category.model';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: DatabaseService,
    private readonly languageContextProvider: LanguageContextProvider,
  ) {}

  async findAll(): Promise<Product[]> {
    const locale = this.languageContextProvider.getLanguage();
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
    const locale = this.languageContextProvider.getLanguage();
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
      include: { category: true },
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

  async getCategoryById(id: number): Promise<Category> {
    return this.prismaService.category.findUnique({ where: { id } });
  }
}
