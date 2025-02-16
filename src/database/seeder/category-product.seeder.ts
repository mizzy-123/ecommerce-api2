import { AppDataSource } from "../../data-source";
import { CategoryProduct } from "../entity/CategoryProduct";

export const CategoryProductSeeder = async () => {
    try {
        const categoryProduct = AppDataSource.getRepository(CategoryProduct);
        const alfabet = ["A", "B", "C", "D"];

        const category: Partial<CategoryProduct>[] = [
            {
                name: "Souvenir",
                code: alfabet[getRandomNumber(0, alfabet.length - 1)]
            },
            {
                name: "Gantungan",
                code: alfabet[getRandomNumber(0, alfabet.length - 1)]
            },
            {
                name: "Baju",
                code: alfabet[getRandomNumber(0, alfabet.length - 1)]
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

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
