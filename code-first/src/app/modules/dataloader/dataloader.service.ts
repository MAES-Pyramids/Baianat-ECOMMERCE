import * as DataLoader from 'dataloader';
import { Product } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IDataloaders } from './dataloader.interface';
import { ProductService } from '../product/product.service';

@Injectable()
export class DataloaderService {
  constructor(private categoryService: ProductService) {}

  getLoaders(): IDataloaders {
    const productsLoader = this._createProductsLoader();
    return { productsLoader };
  }

  private _createProductsLoader() {
    return new DataLoader<number, Product>(
      async (keys: readonly number[]) =>
        await this.categoryService.getCategoryProductsByBatch(keys as number[]),
    );
  }
}
