import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./database/entity/User";
import { Address } from "./database/entity/Address";
import { Role } from "./database/entity/Role";

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
