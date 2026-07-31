import { Product } from "./product";

export function createEmptyProduct(): Product {
  return {
    productId: 0,
    productName: '',
    productCode: '',
    description: '',
    releaseDate: '',
    price: 0,
    starRating: 0,
    imageUrl: '',
    tags: [],
  };
}