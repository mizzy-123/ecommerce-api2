import { NextFunction, Request, Response } from "express";
import { UlasanService } from "../service/ulasan.service";

export class UlasanController {
    static async showAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UlasanService.showAll(req);
            res.status(200).json({
                code: 200,
                message: "Get ulasan product successfull",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}
