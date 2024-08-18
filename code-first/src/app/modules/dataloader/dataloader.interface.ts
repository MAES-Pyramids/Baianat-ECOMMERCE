import DataLoader from 'dataloader';
import { Category, Product } from '@prisma/client';

export interface IDataloaders {
  productsLoader: DataLoader<number, Product>;
  categoriesLoader: DataLoader<number, Category>;
}
