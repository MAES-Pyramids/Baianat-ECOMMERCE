import DataLoader from 'dataloader';
import { Product } from '@prisma/client';

export interface IDataloaders {
  productsLoader: DataLoader<number, Product>;
}
