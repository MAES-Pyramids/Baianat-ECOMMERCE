import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [ProductModule, CategoryModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
