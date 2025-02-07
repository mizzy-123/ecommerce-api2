import { NextFunction, Request, Response } from "express";
import { ProductService } from "../service/product.service";
import { ShowProductStockRequest } from "../model/product.model";

export class ProductController {
    static async showProductStock(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const request: ShowProductStockRequest =
                req.body as ShowProductStockRequest;
            const response = await ProductService.showProductStock(request);

            res.status(200).json({
                code: 200,
                message: "Get product stock success",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

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

    static async detail(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await ProductService.detailProduct(req);
            res.status(200).json({
                code: 200,
                message: "Get detail product successfull",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}
