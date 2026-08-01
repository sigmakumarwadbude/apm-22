import { Router } from 'express';

import { ProductController } from '../controllers/product.controller';
import { asyncHandler } from '../../middleware/async-handler';
import { PrismaProductRepository } from '../repository/prisma-product.repository';
import { ProductService } from '../services/product.service';

const router = Router();
const repository = new PrismaProductRepository();
const service = new ProductService(repository);
const controller = new ProductController(service);

router
    .route('/')
    .get(asyncHandler(controller.getAll))
    .post(asyncHandler(controller.create));

router
    .route('/:id')
    .get(asyncHandler(controller.getById))
    .put(asyncHandler(controller.update))
    .delete(asyncHandler(controller.delete));

export default router;