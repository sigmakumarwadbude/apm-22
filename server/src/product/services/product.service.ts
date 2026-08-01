import { ProductMapper } from "../domain/product.mapper";
import { ProductRepository } from "../domain/product.repository";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductDto } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

export class ProductService {
    constructor(
        private readonly repository: ProductRepository
    ) { }

    async getAll(): Promise<ProductDto[]> {
        const products = await this.repository.findAll();

        return products.map(ProductMapper.toDto);
    }

    async getById(productId: number): Promise<ProductDto> {

        const product = await this.repository.findById(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        return ProductMapper.toDto(product);
    }

    async create(
        dto: CreateProductDto
    ): Promise<ProductDto> {

        const product = ProductMapper.toDomain(dto);

        const created = await this.repository.create(product);

        return ProductMapper.toDto(created);
    }
}