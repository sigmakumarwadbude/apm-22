import { Request, Response, NextFunction } from 'express';

export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncHandler = (fn: AsyncHandler) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await fn(req, res, next);
  } catch (err) {
    next(err);
  }
};