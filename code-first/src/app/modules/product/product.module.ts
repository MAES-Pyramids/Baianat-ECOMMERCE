import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';

@Module({
  providers: [ProductResolver, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
