import { AppDataSource } from "../../data-source";
import { CategoryProduct } from "../entity/CategoryProduct";

export const CategoryProductSeeder = async () => {
    try {
        const categoryProduct = AppDataSource.getRepository(CategoryProduct);

        const category: Partial<CategoryProduct>[] = [
            {
                name: "Manik"
            },
            {
                name: "Gantungan"
            }
        ];

        await categoryProduct.insert(category);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in CategoryProductSeeder:", error.message);
        } else {
            console.error("Error in CategoryProductSeeder:", error);
        }
    }
};
