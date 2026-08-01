import { Request, Response } from 'express';
import { ProductService } from "../services/product.service";

export class ProductController {

    constructor(
        private readonly service: ProductService
    ) { }

    getAll = async (_req: Request, res: Response) => {
        const products = await this.service.getAll();
        res.json(products);
    };

    getById = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const product = await this.service.getById(id);
        res.json(product);
    };

    create = async (req: Request, res: Response) => {
        const product = await this.service.create(req.body);
        res
            .status(201)
            .location(`/api/products/${product.id}`)
            .json(product);
    };

    update = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const product = await this.service.update(id, req.body);
        res.json(product);
    };
}