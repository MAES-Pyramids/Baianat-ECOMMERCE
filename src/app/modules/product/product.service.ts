import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Product } from '../../shared/types/graphql.schema';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: DatabaseService) {}

  async findAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: { category: true },
    });
  }

  async findOne(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prismaService.product.findUnique({
      where,
      include: { category: true },
    });
  }

  async create(
    createProductInput: Prisma.ProductCreateInput,
  ): Promise<Product> {
    return this.prismaService.product.create({
      data: createProductInput,
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
}
