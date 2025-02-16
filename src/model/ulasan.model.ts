import { MediaUlasan } from "../database/entity/MediaUlasan";
import { Ulasan } from "../database/entity/Ulasan";
import { VariationItem } from "../database/entity/VariationItem";

export type GetUlasanResponse = {
    total_ulasan: number;
    total_rating: number;
    rata_ulasan: number;
    data_ulasan: DataUlasan[];
};

export type DataUlasan = {
    id: number;
    product_id: number;
    user_id: string;
    ulasan: string;
    star: number;
    created_at: Date;
    updated_at: Date;
    number_of_like: number;
    media_ulasan: MediaUlasan[];
    variation_item: VariationItem[];
};

export function toUlasanResponse(ulasan: Ulasan[]): GetUlasanResponse {
    const total_ulasan = ulasan.length;
    const total_rating = ulasan.reduce((sum, item) => sum + item.star, 0);
    const rata_ulasan = total_rating / total_ulasan;

    const dataUlasan = ulasan.map((v): DataUlasan => {
        const number_of_like = v.ulasan_likes.length;
        const variationItem = v.ulasan_variation_items.map(
            (v) => v.variation_item
        );
        return {
            id: v.id,
            product_id: v.product_id,
            user_id: v.user_id,
            ulasan: v.ulasan,
            star: v.star,
            created_at: v.created_at,
            updated_at: v.updated_at,
            number_of_like: number_of_like,
            media_ulasan: v.media_ulasans,
            variation_item: variationItem
        };
    });
    return {
        total_ulasan: total_ulasan,
        total_rating: total_rating,
        rata_ulasan: rata_ulasan,
        data_ulasan: dataUlasan
    };
}
