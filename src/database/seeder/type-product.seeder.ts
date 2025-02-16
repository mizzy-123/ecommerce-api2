import { AppDataSource } from "../../data-source";
import { TypeProduct } from "../entity/TypeProduct";

export const TypeProductSeeder = async () => {
    try {
        const typeProductRepo = AppDataSource.getRepository(TypeProduct);

        const typeProduct: Partial<TypeProduct>[] = [
            {
                name: "Tipe A"
            },
            {
                name: "Tipe B"
            }
        ];

        await typeProductRepo.insert(typeProduct);

        console.log("Type product seeding completed!");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in TypeProductSeeder:", error.message);
        } else {
            console.error("Error in TypeProductSeeder:", error);
        }
    }
};
