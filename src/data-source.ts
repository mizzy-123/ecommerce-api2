import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Address } from "./entity/Address";
import { Role } from "./entity/Role";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "ecommerce3",
    synchronize: true,
    logging: false,
    entities: [User, Address, Role],
    migrations: ["src/migration/**/*.ts"],
    subscribers: []
});
