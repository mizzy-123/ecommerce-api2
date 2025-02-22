import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Product } from "./Product";

export enum GalleryProductType {
    IMAGE = "image",
    VIDEO = "video"
}

@Entity()
export class GalleryProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.galleryProducts)
    @JoinColumn({ name: "product_id" })
    product: Product;
    @Column()
    product_id: number;

    @Column({
        type: "enum",
        enum: GalleryProductType,
        default: GalleryProductType.IMAGE
    })
    type: GalleryProductType;

    @Column()
    gallery_url: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
