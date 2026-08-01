import { Product } from "./product";
import { ProductDto } from "./product.dto";


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
            imageUrl: dto.imageUrl,
            tags: dto.tags,
        };
    }

    static fromDtos(dtos: readonly ProductDto[]): readonly Product[] {
        return dtos.map(ProductMapper.fromDto);
    }
}