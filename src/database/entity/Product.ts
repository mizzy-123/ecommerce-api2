import {
    AfterInsert,
    BeforeInsert,
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
import { Slug } from "../../util/slug";
import { Ulasan } from "./Ulasan";

export enum StatusProduct {
    TERSEDIA = "tersedia",
    SEDIKIT = "sedikit",
    HABIS = "habis"
}

export enum Kelangkaan {
    KHUSUS = "I",
    TIDAK = "O"
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(() => Ulasan, (ulasan) => ulasan.product, {
        onDelete: "CASCADE"
    })
    ulasans: Ulasan[];

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
    galleryProducts: GalleryProduct[];

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
        enum: StatusProduct,
        default: StatusProduct.TERSEDIA
    })
    status_product: StatusProduct;

    @Column({
        type: "enum",
        enum: Kelangkaan,
        default: Kelangkaan.TIDAK
    })
    kelangkaan: Kelangkaan;

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
    tahun_produksi: string;

    @Column({
        type: "text"
    })
    description: string;

    @Column({
        default: 0
    })
    sold_quantity: number;

    @Column()
    publish: boolean;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @BeforeInsert()
    @AfterInsert()
    generateSlug() {
        if (this.name) {
            return Slug.createSlugProduct(this.name).then((slug) => {
                this.slug = slug;
            });
        }
    }
}
