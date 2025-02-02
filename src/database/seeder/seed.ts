import { exit } from "process";
import { AppDataSource } from "../../data-source";
import { RoleSeeder } from "./role.seeder";
import { UserSeeder } from "./user.seeder";
import "dotenv/config";
import { CategoryProductSeeder } from "./category-product.seeder";
import { productSeeder } from "./product.seeder";
import { RatingProductSeeder } from "./rating-product.seeder";

const Seed = async () => {
    await AppDataSource.initialize();
    console.log("Database connected!");

    await RoleSeeder();
    await UserSeeder();
    await CategoryProductSeeder();
    await productSeeder();
    await RatingProductSeeder();

    exit();
};

Seed();
