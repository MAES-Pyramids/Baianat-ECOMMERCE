import * as DataLoader from 'dataloader';
import { Category, Product } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IDataloaders } from './dataloader.interface';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class DataloaderService {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  getLoaders(): IDataloaders {
    const productsLoader = this._createProductsLoader();
    const categoriesLoader = this._createCategoriesLoader();
    return { productsLoader, categoriesLoader };
  }

  private _createProductsLoader() {
    return new DataLoader<number, Product>(
      async (keys: readonly number[]) =>
        await this.productService.getCategoryProductsByBatch(keys as number[]),
    );
  }

  private _createCategoriesLoader() {
    return new DataLoader<number, Category>(
      async (keys: readonly number[]) =>
        await this.categoryService.getProductCategoriesByBatch(
          keys as number[],
        ),
    );
  }
}
