export interface CreateProductDto {
  productName: string;
  productCode: string;
  releaseDate: string;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
  tags?: string[];
}