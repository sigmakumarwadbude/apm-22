import { Router } from 'express';

import { ProductController } from '../controllers/product.controller';
import { asyncHandler } from '../../middleware/async-handler';
import { PrismaProductRepository } from '../repository/prisma-product.repository';
import { ProductService } from '../services/product.service';

const router = Router();
const repository = new PrismaProductRepository();
const service = new ProductService(repository);
const controller = new ProductController(service);

router.get(
  '/products',
  asyncHandler(controller.getAll),
);

router.get(
    '/products/:id',
    asyncHandler(controller.getById),
);

router.post(
    '/products',
    asyncHandler(controller.create)
)

router.put(
    '/products/:id',
    asyncHandler(controller.update)
)

export default router;