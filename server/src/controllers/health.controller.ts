import { Request, Response } from "express";

export class HealthController{
    getHealth = (req: Request, res: Response) => {
        res.status(200).json({
            message: "Server is running.",
            success: true,
            timestamp: new Date(),
            version: '1.0.0',
            path: req.url
        });
    }
}