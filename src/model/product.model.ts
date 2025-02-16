import { CategoryProduct } from "../database/entity/CategoryProduct";
import { GalleryProduct } from "../database/entity/GalleryProduct";
import { Product } from "../database/entity/Product";
import { ProductStock } from "../database/entity/ProductStock";
import { RatingProduct } from "../database/entity/RatingProduct";
import { TypeProduct } from "../database/entity/TypeProduct";
import { Variation } from "../database/entity/Variation";
import QRCode from "qrcode"; // Untuk ES Modules

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
    id: number;
    uuid: string;
    category_product_id: number;
    name: string;
    status_product: string;
    slug: string;
    weight: number;
    tahun_produksi: string | null;
    description: string;
    sold_quantity: number;
    publish: boolean;
    created_at: Date;
    updated_at: Date;
    category_product: CategoryProduct;
    gallery_product: GalleryProduct;
    rating_product: RatingProduct;
    product_stock: ProductStock;
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
            uuid: v.uuid,
            category_product_id: v.category_product_id,
            name: v.name,
            status_product: v.status_product,
            slug: v.slug,
            weight: v.weight,
            tahun_produksi: v.tahun_produksi,
            description: v.description,
            sold_quantity: v.sold_quantity,
            publish: v.publish,
            created_at: v.created_at,
            updated_at: v.updated_at,
            category_product: v.category_product,
            gallery_product: v.galleryProducts[0],
            rating_product: v.ratingProduct,
            product_stock: productStock[0]
        };
    });

    return dataProduct;
}

/* ========== Detail product ============= */

export type GetDetailProductResponse = {
    id: number;
    uuid: string;
    category_product_id: number;
    name: string;
    status_product: string;
    slug: string;
    weight: number;
    tahun_produksi: string | null;
    description: string;
    sold_quantity: number;
    publish: boolean;
    created_at: Date;
    updated_at: Date;
    category_product: CategoryProduct;
    gallery_product: GalleryProduct[];
    rating_product: RatingProduct;
    product_stock: ProductStock;
    variations: Variation[];
};

export function toDetailDataProduct(
    p: Product | null
): GetDetailProductResponse | null {
    if (!p) return null;

    const productStock = p.productStocks;
    productStock.sort((a, b) => a.price_sell - b.price_sell);

    // Kembalikan objek dengan urutan sesuai GetDetailProductResponse
    return {
        id: p.id,
        uuid: p.uuid,
        category_product_id: p.category_product_id,
        name: p.name,
        status_product: p.status_product,
        slug: p.slug,
        weight: p.weight,
        tahun_produksi: p.tahun_produksi,
        description: p.description,
        sold_quantity: p.sold_quantity,
        publish: p.publish,
        created_at: p.created_at,
        updated_at: p.updated_at,
        category_product: p.category_product,
        gallery_product: p.galleryProducts,
        rating_product: p.ratingProduct,
        product_stock: productStock[0], // Ambil product_stock dengan harga terendah
        variations: p.variations
    };
}

/* ========== Product Stock ============= */

export type ShowProductStockRequest = {
    variation_item_id_1: number | null;
    variation_item_id_2: number | null;
};

/* ========== Get product from admin =========== */

export type GetProductWithQr = {
    id: number;
    uuid: string;
    serial_number: string;
    category_product_id: number;
    name: string;
    status_product: string;
    slug: string;
    weight: number;
    tahun_produksi: string | null;
    description: string;
    sold_quantity: number;
    publish: boolean;
    created_at: Date;
    updated_at: Date;
    category_product: CategoryProduct;
    type_product: TypeProduct;
    kode_qr: string;
};

export async function toGetProductWithQr(
    product: Product[]
): Promise<GetProductWithQr[]> {
    const data = await Promise.all(
        product.map(async (v): Promise<GetProductWithQr> => {
            const serialNumber = `WASTRA-${v.category_product.code}${
                v.kelangkaan
            }-${v.tahun_produksi.toString().slice(-2)}${v.category_product.id
                .toString()
                .padStart(3, "0")}-${v.id.toString().padStart(5, "0")}`;

            const qrCodeData = await QRCode.toDataURL(serialNumber);

            return {
                id: v.id,
                uuid: v.uuid,
                serial_number: serialNumber,
                category_product_id: v.category_product_id,
                name: v.name,
                status_product: v.status_product,
                slug: v.slug,
                weight: v.weight,
                tahun_produksi: v.tahun_produksi,
                description: v.description,
                sold_quantity: v.sold_quantity,
                publish: v.publish,
                created_at: v.created_at,
                updated_at: v.updated_at,
                category_product: v.category_product,
                type_product: v.type_product,
                kode_qr: qrCodeData
            };
        })
    );

    return data;
}
