import { Prisma, Product as PrismaProduct } from '@prisma/client';
import { Product } from './product';
import { ProductDto } from '../dto/product.dto';
import { CreateProductDto } from '../dto/create-product.dto';

export class ProductMapper {

  static fromPrisma(product: PrismaProduct): Product {
    return {
      id: product.id,
      productName: product.productName,
      productCode: product.productCode,
      releaseDate: product.releaseDate,
      description: product.description,
      price: Number(product.price),
      starRating: product.starRating,
      imageUrl: product.imageUrl,
      tags: product.tags,
    };
  }

  static toPrisma(product: Partial<Product>): Prisma.ProductUncheckedCreateInput | Prisma.ProductUncheckedUpdateInput {
    return {
      ...(product.productName !== undefined && { productName: product.productName }),
      ...(product.productCode !== undefined && { productCode: product.productCode }),
      ...(product.releaseDate !== undefined && { releaseDate: product.releaseDate }),
      ...(product.description !== undefined && { description: product.description }),
      ...(product.price !== undefined && { price: product.price }),
      ...(product.starRating !== undefined && { starRating: product.starRating }),
      ...(product.imageUrl !== undefined && { imageUrl: product.imageUrl }),
      ...(product.tags !== undefined && { tags: product.tags }),
    };
  }

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