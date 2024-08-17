import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Product } from '@prisma/client';
import { ProductService } from '../product/product.service';
import { IDataloaders } from './dataloader.interface';

@Injectable()
export class DataloaderService {
  constructor(private readonly productService: ProductService) {}

  getLoaders(): IDataloaders {
    const productsLoader = this._createProductsLoader();
    return { productsLoader };
  }

  private _createProductsLoader() {
    return new DataLoader<number, Product>(
      async (keys: number[]) =>
        await this.productService.batchProductsByCategory(keys),
    );
  }
}
