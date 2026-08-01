import { APP, HTTP_STATUS } from "../shared/constants";
import { Request, Response } from "express";

export class HealthController {
    readonly getHealth = (req: Request, res: Response) => {
        res.status(HTTP_STATUS.OK).json({
      success: true,
      application: APP.NAME,
      version: APP.VERSION,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
    }
}