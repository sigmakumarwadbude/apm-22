import { Product } from './product';
import { ProductDto } from '../dto/product.dto';
import { CreateProductDto } from '../dto/create-product.dto';

export class ProductMapper {
  static toDto(product: Product): ProductDto {
    return {
      id: product.id,
      productName: product.productName,
      productCode: product.productCode,
      releaseDate: product.releaseDate.toISOString(),
      description: product.description,
      price: product.price,
      starRating: product.starRating,
      imageUrl: product.imageUrl,
      tags: product.tags,
    };
  }

  static toDomain(dto: CreateProductDto): Product {
    return {
      id: 0,
      productName: dto.productName,
      productCode: dto.productCode,
      releaseDate: new Date(dto.releaseDate),
      description: dto.description,
      price: dto.price,
      starRating: dto.starRating,
      imageUrl: dto.imageUrl,
      tags: dto.tags ?? [],
    };
  }
}