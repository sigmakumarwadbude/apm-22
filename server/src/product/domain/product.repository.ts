import { Product } from './product';

export interface ProductRepository {
  findAll(): Promise<Product[]>;

  findById(id: number): Promise<Product | null>;

  create(product: Product): Promise<Product>;
}