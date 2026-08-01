import { Router } from 'express';
import healthRoutes from './health.routes';
import productRoutes from '../product/routes/product.routes';

const router = Router();

router.use(healthRoutes);
router.use(productRoutes);

export default router;