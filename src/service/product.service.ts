import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Product, StatusProduct } from "../database/entity/Product";
import { Brackets } from "typeorm";
import {
    GetProductResponse,
    toGetProductResponse
} from "../model/product.model";
import { ProductStock } from "../database/entity/ProductStock";

export class ProductService {
    static async product(req: Request): Promise<GetProductResponse> {
        const take = 8; // Jumlah data per halaman
        const page = Number(req.query.page) || 1; // Ambil page dari request, default 1
        const skip = (page - 1) * take; // Hitung offset untuk pagination

        const query = AppDataSource.getRepository(Product)
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.ratingProduct", "ratingProduct")
            .leftJoinAndSelect("product.galleryProducts", "galleryProducts")
            .leftJoinAndSelect("product.productStocks", "productStocks")
            .where("product.publish = :publish", { publish: true })
            .andWhere(
                new Brackets((qb) => {
                    qb.where("product.status_product = :tersedia", {
                        tersedia: StatusProduct.TERSEDIA
                    }).orWhere("product.status_product = :stokSedikit", {
                        stokSedikit: StatusProduct.SEDIKIT
                    });
                })
            )
            .orderBy("product.created_at", "DESC");

        // Tambahkan filter kategori jika ada
        if (req.query.category) {
            query.andWhere("product.category_product_id = :categoryId", {
                categoryId: req.query.category
            });
        }

        if (req.query.bestSeller) {
            const order = req.query.bestSeller === "true" ? "DESC" : "ASC";
            query.orderBy("product.sold_quantity", order);
        }

        if (req.query.price) {
            const priceOrder = req.query.price === "asc" ? "ASC" : "DESC";
            // Subquery untuk mendapatkan harga minimum (price_sell) dari productStocks

            const subQuery = AppDataSource.getRepository(ProductStock)
                .createQueryBuilder("ps")
                .select("MIN(ps.price_sell)", "min_price")
                .where("ps.product_id = product.id")
                .getQuery();

            // Tambahkan subquery ke query utama
            query
                .addSelect(`(${subQuery})`, "min_price")
                .orderBy("min_price", priceOrder);
        }

        const [products, total] = await Promise.all([
            query.skip(skip).take(take).getMany(),
            query.getCount()
        ]);

        const totalPages = Math.ceil(total / take);

        return toGetProductResponse(products, page, take, totalPages, total);
    }
}
