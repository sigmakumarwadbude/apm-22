import { prisma } from '../../config/prisma';
import { ProductRepository } from '../domain/product.repository';
import { Product } from '../domain/product';
import { ProductMapper } from '../domain/product.mapper';

export class PrismaProductRepository
    implements ProductRepository {

    async findAll(): Promise<Product[]> {
        const products = await prisma.product.findMany({
            orderBy: { id: 'asc' }
        });

        return products.map(ProductMapper.fromPrisma);
    }

    
}