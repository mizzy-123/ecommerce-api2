import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Product } from "./Product";
import { VariationItem } from "./VariationItem";

@Entity()
export class Variation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Product, (product) => product.variations, {
        onDelete: "CASCADE"
    })
    products: Product[];

    @OneToMany(
        () => VariationItem,
        (variationItem) => variationItem.variation,
        { onDelete: "CASCADE" }
    )
    variation_items: VariationItem[];

    @Column()
    name: string;

    @Column()
    show_image: boolean;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
