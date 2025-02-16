import { NextFunction, Request, Response } from "express";
import { ProductService } from "../service/product.service";
import { ShowProductStockRequest } from "../model/product.model";
import { AuthRequest } from "../request/auth.request";
import ejs from "ejs";
import path from "path";
import puppeteer from "puppeteer";
import fs from "fs";

export class ProductController {
    static async exportProductQrPdf(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const getProductWithQr = await ProductService.showProductWithQr();

            const html = await ejs.renderFile(
                path.join(__dirname, "../view/pdf/productqr.pdf.ejs"),
                { products: getProductWithQr }
            );
            const browser = await puppeteer.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: true
            });
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: "domcontentloaded" });

            const pdfBuffer = await page.pdf({
                format: "A4",
                printBackground: true
            });

            await browser.close();

            const filePath = path.join(__dirname, "../../public/productqr.pdf");
            fs.writeFileSync(filePath, pdfBuffer);

            res.redirect("/public/productqr.pdf");
        } catch (error) {
            next(error);
        }
    }

    static async showProductWithQr(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await ProductService.showProductWithQr();
            res.status(200).json({
                code: 200,
                message: "Get data product with QR Success",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

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
