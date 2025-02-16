import { NextFunction, Request, Response, Router } from "express";
import { ProductController } from "../controller/product.controller";

export const adminRouter = Router();

adminRouter.get("/admin", (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            message: "test"
        });
    } catch (error) {
        next(error);
    }
});

adminRouter.get("/qr/product", ProductController.showProductWithQr);
