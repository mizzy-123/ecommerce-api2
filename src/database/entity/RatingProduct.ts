import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class RatingProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Product, (product) => product.ratingProduct)
    @JoinColumn({ name: "product_id" })
    product: Product;
    @Column()
    product_id: number;

    @Column({
        type: "decimal"
    })
    rating: number;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
