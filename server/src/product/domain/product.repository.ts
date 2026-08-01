import { Product } from './product';

export interface ProductRepository {
  findAll(): Promise<Product[]>;

  findById(productId: number): Promise<Product | null>;

  create(product: Product): Promise<Product>;

  update(
    productId: number,
    product: Partial<Product>
  ): Promise<Product>;

  delete(productId: number): Promise<void>;
}