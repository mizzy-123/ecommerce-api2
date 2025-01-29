import { exit } from "process";
import { AppDataSource } from "../../data-source";

const format = async () => {
    await AppDataSource.initialize();
    console.log("Database connected!");

    await AppDataSource.dropDatabase();
    console.log("Database formatted!");

    exit();
};

format();
