import { NextFunction, Request, Response } from "express";
import { ProductService } from "../service/product.service";

export class ProductController {
    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await ProductService.product(req);
            res.status(200).json({
                code: 200,
                data: response.data,
                pagination: response.pagination
            });
            // res.status(200).json({
            //     code: 200,
            //     data: response
            // });
        } catch (error) {
            next(error);
        }
    }
}
