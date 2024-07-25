import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { LanguageContextProvider } from '../../shared/services/language-context.service';

@Module({
  providers: [ProductResolver, ProductService, LanguageContextProvider],
})
export class ProductModule {}
