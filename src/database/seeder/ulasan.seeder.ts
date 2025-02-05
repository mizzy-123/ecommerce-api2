import { AppDataSource } from "../../data-source";
import { MediaUlasan, TypeMediaUlasan } from "../entity/MediaUlasan";
import { Product } from "../entity/Product";
import { ProductStock } from "../entity/ProductStock";
import { Ulasan } from "../entity/Ulasan";
import { UlasanVariationItem } from "../entity/UlasanVariationItem";
import { User } from "../entity/User";
import { VariationItemStock } from "../entity/VariationItemStock";

export const UlasanSeeder = async () => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const productRepo = AppDataSource.getRepository(Product);
        const productStockRepo = AppDataSource.getRepository(ProductStock);
        const variantItemStockRepo =
            AppDataSource.getRepository(VariationItemStock);
        const ulasanRepo = AppDataSource.getRepository(Ulasan);
        const mediaUlasanRepo = AppDataSource.getRepository(MediaUlasan);
        const ulasanVariantItem =
            AppDataSource.getRepository(UlasanVariationItem);

        const dataUser = await userRepo.find();
        const dataUserCount = dataUser.length;
        const dataProduct = await productRepo.find();

        const comment = [
            {
                name: "Test comment"
            },
            {
                name: "ada dua kemungkinan -> kemungkinan kemungkinan"
            }
        ];

        for (const p of dataProduct) {
            const dataProductStock = await productStockRepo.find({
                where: {
                    product_id: p.id
                }
            });
            const productStockCount = dataProductStock.length;
            const dataVarianItemStock = await variantItemStockRepo.findOne({
                where: {
                    product_stock_id:
                        dataProductStock[randomNumber(0, productStockCount - 1)]
                            .id
                }
            });

            for (const d of comment) {
                const createUlasan = ulasanRepo.create({
                    product_id: p.id,
                    user_id: dataUser[randomNumber(0, dataUserCount - 1)].id,
                    ulasan: d.name,
                    star: randomNumber(1, 5)
                });

                const returnUlasan = await ulasanRepo.save(createUlasan);

                await mediaUlasanRepo.insert({
                    type: TypeMediaUlasan.IMAGE,
                    media_url: "https://picsum.photos/500/500",
                    ulasan: returnUlasan
                });

                await mediaUlasanRepo.insert({
                    type: TypeMediaUlasan.IMAGE,
                    media_url: "https://picsum.photos/500/500",
                    ulasan: returnUlasan
                });

                await ulasanVariantItem.insert({
                    ulasan_id: returnUlasan.id,
                    variation_item_id: dataVarianItemStock?.variation_item_id_1
                });

                if (dataVarianItemStock?.variation_item_id_2) {
                    await ulasanVariantItem.insert({
                        ulasan_id: returnUlasan.id,
                        variation_item_id:
                            dataVarianItemStock?.variation_item_id_2
                    });
                }
            }
        }

        console.log("Ulasan seeding completed!");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in UlasanSeeder:", error.message);
        } else {
            console.error("Error in UlasanSeeder:", error);
        }
    }
};

function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
