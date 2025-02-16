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
import { UlasanVariationItem } from "./database/entity/UlasanVariationItem";
import { UlasanLike } from "./database/entity/UlasanLike";
import { AddressApi } from "./database/entity/AddressApi";
import { TypeProduct } from "./database/entity/TypeProduct";

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
        AddressApi,
        Role,
        TypeProduct,
        Product,
        ProductStock,
        Variation,
        VariationItem,
        VariationItemStock,
        RatingProduct,
        CategoryProduct,
        GalleryProduct,
        Ulasan,
        MediaUlasan,
        UlasanVariationItem,
        UlasanLike
    ],
    migrations: ["src/migration/**/*.ts"],
    subscribers: []
});
