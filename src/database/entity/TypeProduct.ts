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
export class TypeProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Product, (product) => product.type_product, {
        onDelete: "CASCADE"
    })
    products: Product[];

    @Column({
        type: "varchar",
        length: 100
    })
    name: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
