import { exit } from "process";
import { AppDataSource } from "../../data-source";
import { RoleSeeder } from "./role.seeder";
import { UserSeeder } from "./user.seeder";
import "dotenv/config";
import { CategoryProductSeeder } from "./category-product.seeder";
import { ProductSeeder } from "./product.seeder";
import { RatingProductSeeder } from "./rating-product.seeder";
import { UlasanSeeder } from "./ulasan.seeder";

const Seed = async () => {
    await AppDataSource.initialize();
    console.log("Database connected!");

    await RoleSeeder();
    await UserSeeder();
    await CategoryProductSeeder();
    await ProductSeeder();
    await RatingProductSeeder();
    await UlasanSeeder();
    exit();
};

Seed();
