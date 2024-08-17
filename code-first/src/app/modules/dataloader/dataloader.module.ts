import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
