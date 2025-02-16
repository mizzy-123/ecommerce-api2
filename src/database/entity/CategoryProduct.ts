import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class CategoryProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Product, (product) => product.category_product)
    products: Product[];

    @Column({
        type: "varchar",
        length: 100
    })
    name: string;

    @Column({
        type: "varchar",
        length: 100
    })
    code: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
