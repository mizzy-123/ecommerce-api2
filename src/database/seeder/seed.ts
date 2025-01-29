import { exit } from "process";
import { AppDataSource } from "../../data-source";
import { RoleSeeder } from "./role.seeder";
import { UserSeeder } from "./user.seeder";
import "dotenv/config";

const Seed = async () => {
    await AppDataSource.initialize();
    console.log("Database connected!");

    await RoleSeeder();
    await UserSeeder();

    exit();
};

Seed();
