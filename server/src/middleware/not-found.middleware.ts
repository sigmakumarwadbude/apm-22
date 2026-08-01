import { HTTP_STATUS } from '../shared/constants';
import { Request, Response } from 'express';

export const notFoundMiddleware = (req: Request, res: Response): void => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: `Route '${req.originalUrl}' not found`,
    });
};