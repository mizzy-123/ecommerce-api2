import { AppDataSource } from "../../data-source";
import { CategoryProduct } from "../entity/CategoryProduct";
import { GalleryProduct, GalleryProductType } from "../entity/GalleryProduct";
import { Product, StatusProduct } from "../entity/Product";
import { ProductStock } from "../entity/ProductStock";
import { Variation } from "../entity/Variation";
import { VariationItem } from "../entity/VariationItem";
import { VariationItemStock } from "../entity/VariationItemStock";

export const productSeeder = async () => {
    try {
        const productRepo = AppDataSource.getRepository(Product);
        const categoryRepo = AppDataSource.getRepository(CategoryProduct);
        const galleryProductRepo = AppDataSource.getRepository(GalleryProduct);
        const getCategory = await categoryRepo.find();

        const variantRepo = AppDataSource.getRepository(Variation);

        const dataWarna = ["Merah", "Biru", "Kuning"];

        const product1 = productRepo.create({
            status_product: StatusProduct.TERSEDIA,
            material: "Plastik",
            name: "Gantungan kunci JKT",
            category_product: getCategory[0],
            description:
                "Product ini adalah product suangarProduct suangar 1234"
        });

        const returnProduct1 = await productRepo.save(product1);

        await galleryProductRepo.insert({
            type: GalleryProductType.IMAGE,
            gallery_url: "https://picsum.photos/500/500",
            product: returnProduct1
        });

        const variant1 = variantRepo.create({
            name: "Warna"
        });

        const returnVariant1 = await variantRepo.save(variant1);
        returnProduct1.variations = [returnVariant1];
        await productRepo.save(returnProduct1);

        const dataVariation: VariationItem[] = [];

        dataWarna.forEach(async (v) => {
            const variationItemRepo =
                AppDataSource.getRepository(VariationItem);
            const variationItem = variationItemRepo.create({
                name: v,
                variation: returnVariant1
            });
            const returnVariationItem = await variantRepo.save(variationItem);
            dataVariation.push(returnVariationItem);
        });

        dataVariation.forEach(async (v) => {
            const productStockRepo = AppDataSource.getRepository(ProductStock);

            const productStock = productStockRepo.create({
                price_sell: getRandomPrice(1000, 20000),
                quantity: getRandomNumber(1, 10),
                product: returnProduct1
            });

            const returnProductSock = await productStockRepo.save(productStock);

            const variationitemStock =
                AppDataSource.getRepository(VariationItemStock);
            const variationItem = variationitemStock.create({
                product_stock: returnProductSock,
                variation_item_1: v
            });

            await variationitemStock.save(variationItem);
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in productSeeder:", error.message);
        } else {
            console.error("Error in productSeeder:", error);
        }
    }
};

function getRandomPrice(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
