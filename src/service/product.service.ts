import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Product, StatusProduct } from "../database/entity/Product";
import { Brackets } from "typeorm";
import {
    GetDetailProductResponse,
    GetProductResponse,
    ShowProductStockRequest,
    toDetailDataProduct,
    toGetProductResponse
} from "../model/product.model";
import { ProductStock } from "../database/entity/ProductStock";
import { ResponseError } from "../error/response.error";
import { VariationItemStock } from "../database/entity/VariationItemStock";
import { Validation } from "../validation/validation";
import { ProductValidation } from "../validation/product.validation";

export class ProductService {
    static async showProductStock(
        request: ShowProductStockRequest
    ): Promise<ProductStock | null> {
        const data = Validation.validate(
            ProductValidation.SHOW_PRODUCT_STOCK,
            request
        );

        const query =
            AppDataSource.getRepository(VariationItemStock).createQueryBuilder(
                "variationItemStock"
            );

        if (
            data.variation_item_id_1 !== null &&
            data.variation_item_id_2 !== null
        ) {
            query
                .where("variationItemStock.variation_item_id_1 = :id1", {
                    id1: data.variation_item_id_1
                })
                .andWhere("variationItemStock.variation_item_id_2 = :id2", {
                    id2: data.variation_item_id_2
                });
        }
        // Jika hanya variation_item_id_1 yang ada
        else if (data.variation_item_id_1 !== null) {
            query
                .where("variationItemStock.variation_item_id_1 = :id1", {
                    id1: data.variation_item_id_1
                })
                .andWhere("variationItemStock.variation_item_id_2 IS NULL");
        }
        // Jika hanya variation_item_id_2 yang ada
        else if (data.variation_item_id_2 !== null) {
            query
                .where("variationItemStock.variation_item_id_2 = :id2", {
                    id2: data.variation_item_id_2
                })
                .andWhere("variationItemStock.variation_item_id_1 IS NULL");
        }
        // Jika kedua variation_item_id tidak ada
        else {
            query
                .where("variationItemStock.variation_item_id_1 IS NULL")
                .andWhere("variationItemStock.variation_item_id_2 IS NULL");
        }

        // Mengambil hasil query dengan order by DESC dan mengambil satu data pertama
        const result = await query
            .orderBy("variationItemStock.id", "DESC")
            .getOne();

        const productStockRepo = AppDataSource.getRepository(ProductStock);
        const getProductStock = await productStockRepo.findOneBy({
            id: result?.product_stock_id
        });

        return getProductStock;
    }

    static async detailProduct(
        req: Request
    ): Promise<GetDetailProductResponse | null> {
        const slug = req.params.slug;

        if (!slug)
            throw new ResponseError(400, "Invalid of missing productSlug");

        const productRepo = AppDataSource.getRepository(Product);

        const query = await productRepo
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.ratingProduct", "ratingProduct")
            .leftJoinAndSelect("product.galleryProducts", "galleryProducts")
            .leftJoinAndSelect("product.productStocks", "productStocks")
            .leftJoinAndSelect("product.variations", "variations")
            .leftJoinAndSelect("variations.variation_items", "variation_items")
            .where("product.slug = :slug", { slug: slug })
            .getOne();

        return toDetailDataProduct(query);
    }

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
