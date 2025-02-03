import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./database/entity/User";
import { Address } from "./database/entity/Address";
import { Role } from "./database/entity/Role";
import { Product } from "./database/entity/Product";
import { ProductStock } from "./database/entity/ProductStock";
import { Variation } from "./database/entity/Variation";
import { VariationItem } from "./database/entity/VariationItem";
import { VariationItemStock } from "./database/entity/VariationItemStock";
import { RatingProduct } from "./database/entity/RatingProduct";
import { CategoryProduct } from "./database/entity/CategoryProduct";
import { GalleryProduct } from "./database/entity/GalleryProduct";
import { Ulasan } from "./database/entity/Ulasan";
import { MediaUlasan } from "./database/entity/MediaUlasan";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "ecommerce3",
    synchronize: true,
    logging: false,
    entities: [
        User,
        Address,
        Role,
        Product,
        ProductStock,
        Variation,
        VariationItem,
        VariationItemStock,
        RatingProduct,
        CategoryProduct,
        GalleryProduct,
        Ulasan,
        MediaUlasan
    ],
    migrations: ["src/migration/**/*.ts"],
    subscribers: []
});
