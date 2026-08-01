import { Request, Response } from 'express';
import { ProductService } from "../services/product.service";

export class ProductController {

  constructor(
    private readonly service: ProductService
  ) {}

  getAll = async (_req: Request, res: Response) => {
    const products = await this.service.getAll();
    res.json(products);
  };
}