import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Variation } from "./Variation";
import { ProductStock } from "./ProductStock";
import { RatingProduct } from "./RatingProduct";
import { GalleryProduct } from "./GalleryProduct";
import { CategoryProduct } from "./CategoryProduct";

export enum StatusProduct {
    TERSEDIA = "tersedia",
    SEDIKIT = "sedikit",
    HABIS = "habis"
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(
        () => CategoryProduct,
        (categoryProduct) => categoryProduct.products
    )
    @JoinColumn({ name: "category_product_id" })
    category_product: CategoryProduct;
    @Column()
    category_product_id: number;

    @OneToMany(
        () => GalleryProduct,
        (galleryProduct) => galleryProduct.product,
        { onDelete: "CASCADE" }
    )
    galleryProduct: GalleryProduct[];

    @OneToOne(() => RatingProduct, (ratingProduct) => ratingProduct.product, {
        onDelete: "CASCADE"
    })
    ratingProduct: RatingProduct;

    @OneToMany(() => ProductStock, (productStock) => productStock.product, {
        onDelete: "CASCADE"
    })
    productStocks: ProductStock[];

    @ManyToMany(() => Variation, (variation) => variation.products, {
        onDelete: "CASCADE"
    })
    @JoinTable({
        name: "product_variation",
        joinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "varition_id",
            referencedColumnName: "id"
        }
    })
    variations: Variation[];

    @Column({
        type: "varchar",
        length: 100
    })
    name: string;

    @Column({
        type: "enum",
        default: StatusProduct.TERSEDIA
    })
    status_product: StatusProduct;

    @Column({
        type: "varchar",
        length: 100
    })
    slug: string;

    @Column()
    weight: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    material: string | null;

    @Column({
        type: "text"
    })
    description: string;

    @Column()
    sold_quantity: number;

    @Column()
    publish: boolean;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
