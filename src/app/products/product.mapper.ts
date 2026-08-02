import { Product } from "./product";
import { ProductDto } from "./dto/product.dto";
import { CreateProductDto, UpdateProductDto } from "./dto/create-product.dto";


export class ProductMapper {
    static fromDto(dto: ProductDto): Product {
        return {
            productId: dto.id,
            productName: dto.productName,
            productCode: dto.productCode,
            releaseDate: dto.releaseDate.substring(0, 10),
            description: dto.description,
            price: dto.price,
            starRating: dto.starRating,
            imageUrl: dto.imageUrl.startsWith('/images/')
                ? dto.imageUrl
                : `/images/${dto.imageUrl}`,
            tags: dto.tags,
        };
    }

    static fromDtos(dtos: readonly ProductDto[]): readonly Product[] {
        return dtos.map(ProductMapper.fromDto);
    }

    static toCreateDto(product: Product): CreateProductDto {
        return {
            productName: product.productName,
            productCode: product.productCode,
            releaseDate: product.releaseDate,
            description: product.description,
            price: product.price,
            starRating: product.starRating,
            imageUrl: product.imageUrl,
            tags: product.tags ?? [],
        };
    }

    static toDto(product: Product): UpdateProductDto {
        return {
            productId: product.productId,
            productName: product.productName,
            productCode: product.productCode,
            releaseDate: product.releaseDate,
            description: product.description,
            price: product.price,
            starRating: product.starRating,
            imageUrl: product.imageUrl,
            tags: product.tags ?? [],
        };
    }
}