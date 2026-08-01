export interface Product {
  id: number;
  productName: string;
  productCode: string;
  releaseDate: Date;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
  tags: string[];
}