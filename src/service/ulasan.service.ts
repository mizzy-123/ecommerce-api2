import { Request } from "express";
import { ResponseError } from "../error/response.error";
import { AppDataSource } from "../data-source";
import { Ulasan } from "../database/entity/Ulasan";
import { GetUlasanResponse, toUlasanResponse } from "../model/ulasan.model";

export class UlasanService {
    static async showAll(req: Request): Promise<GetUlasanResponse> {
        if (!req.params.productId)
            throw new ResponseError(400, "Invalid or missing productId");

        const ulasanRepo = AppDataSource.getRepository(Ulasan);
        const query = await ulasanRepo
            .createQueryBuilder("ulasan")
            .leftJoinAndSelect("ulasan.ulasan_likes", "ulasan_like")
            .leftJoinAndSelect("ulasan.media_ulasans", "media_ulasans")
            .leftJoinAndSelect(
                "ulasan.ulasan_variation_items",
                "ulasan_variation_items"
            )
            .leftJoinAndSelect(
                "ulasan_variation_items.variation_item",
                "variation_item"
            )
            .where("ulasan.product_id = :product_id", {
                product_id: req.params.productId
            })
            .orderBy("ulasan.id", "DESC")
            .getMany();

        return toUlasanResponse(query);
    }
}
