import { CategoryProduct } from "../database/entity/CategoryProduct";
import { GalleryProduct } from "../database/entity/GalleryProduct";
import { Product } from "../database/entity/Product";
import { ProductStock } from "../database/entity/ProductStock";
import { RatingProduct } from "../database/entity/RatingProduct";

export type GetProductResponse = {
    data: DataProduct[];
    pagination: {
        current_page: number;
        per_page: number;
        total_pages: number;
        total_items: number;
    };
};

export type DataProduct = {
    id: string;
    category_product_id: number;
    name: string;
    status_product: string;
    slug: string;
    weight: number;
    material: string | null;
    description: string;
    sold_quantity: number;
    publish: boolean;
    created_at: Date;
    updated_at: Date;
    category_product: CategoryProduct;
    gallery_product: GalleryProduct;
    rating_product: RatingProduct;
    product_stocks: ProductStock;
};

export function toGetProductResponse(
    product: Product[],
    page: number,
    take: number,
    totalPages: number,
    total: number
): GetProductResponse {
    return {
        data: toDataProduct(product),
        pagination: {
            current_page: page,
            per_page: take,
            total_pages: totalPages,
            total_items: total
        }
    };
}

export function toDataProduct(product: Product[]): DataProduct[] {
    const dataProduct = product.map((v): DataProduct => {
        const productStock = v.productStocks;
        productStock.sort((a, b) => a.price_sell - b.price_sell);
        return {
            id: v.id,
            category_product_id: v.category_product_id,
            category_product: v.category_product,
            created_at: v.created_at,
            description: v.description,
            gallery_product: v.galleryProducts[0],
            material: v.material,
            name: v.name,
            product_stocks: productStock[0],
            publish: v.publish,
            rating_product: v.ratingProduct,
            slug: v.slug,
            sold_quantity: v.sold_quantity,
            status_product: v.status_product,
            updated_at: v.updated_at,
            weight: v.weight
        };
    });

    return dataProduct;
}
