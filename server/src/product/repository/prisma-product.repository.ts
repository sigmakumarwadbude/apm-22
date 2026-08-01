import { injectable } from 'tsyringe';

import { prisma } from '../../config/prisma';
import { ProductRepository } from '../domain/product.repository';
import { Product } from '../domain/product';
import { ProductMapper } from '../domain/product.mapper';

@injectable()
export class PrismaProductRepository
    implements ProductRepository {

    async findAll(): Promise<Product[]> {
        const products = await prisma.product.findMany({
            orderBy: {
                id: 'asc',
            },
        });

        return products.map(ProductMapper.fromPrisma);
    }

    async findById(id: number): Promise<Product | null> {
        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return null;
        }

        return ProductMapper.fromPrisma(product);
    }

    async create(
        product: Product
    ): Promise<Product> {
        const created = await prisma.product.create({
            data: ProductMapper.toPrisma(product),
        });

        return ProductMapper.fromPrisma(created);
    }

    async update(
        id: number,
        product: Partial<Product>
    ): Promise<Product> {
        const updated = await prisma.product.update({
            where: { id },
            data: ProductMapper.toPrisma(product),
        });

        return ProductMapper.fromPrisma(updated);
    }

    async delete(id: number): Promise<void> {
        await prisma.product.delete({
            where: { id },
        });
    }
}