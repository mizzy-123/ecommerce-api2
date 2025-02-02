import { AppDataSource } from "../../data-source";
import { CategoryProduct } from "../entity/CategoryProduct";

export const CategoryProductSeeder = async () => {
    try {
        const categoryProduct = AppDataSource.getRepository(CategoryProduct);

        const category: Partial<CategoryProduct>[] = [
            {
                name: "Souvenir"
            },
            {
                name: "Gantungan"
            },
            {
                name: "Baju"
            }
        ];

        await categoryProduct.insert(category);

        console.log("Category Product seeding completed!");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in CategoryProductSeeder:", error.message);
        } else {
            console.error("Error in CategoryProductSeeder:", error);
        }
    }
};
