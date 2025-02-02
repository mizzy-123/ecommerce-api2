import { AppDataSource } from "../../data-source";
import { Product } from "../entity/Product";
import { RatingProduct } from "../entity/RatingProduct";

export const RatingProductSeeder = async () => {
    try {
        const ratingProductRepo = AppDataSource.getRepository(RatingProduct);
        const productRepo = AppDataSource.getRepository(Product);

        const product = await productRepo.find();

        for (const p of product) {
            const ratingProduct = ratingProductRepo.create({
                product: p,
                rating: 0
            });

            await ratingProductRepo.save(ratingProduct);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in productSeeder:", error.message);
        } else {
            console.error("Error in productSeeder:", error);
        }
    }
};
