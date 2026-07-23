import { Service } from '@angular/core';
import { Product } from './product';
import { PRODUCTS } from './product.data';

@Service()
export class ProductService {
  getProducts(): ReadonlyArray<Product> {
    return PRODUCTS;
  }
}
