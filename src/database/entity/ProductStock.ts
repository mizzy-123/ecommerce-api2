import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Product } from "./Product";
import { VariationItemStock } from "./VariationItemStock";

@Entity()
export class ProductStock {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.productStocks)
    @JoinColumn({ name: "product_id" })
    product: Product;
    @Column()
    product_id: string;

    @OneToMany(
        () => VariationItemStock,
        (variationItemStock) => variationItemStock.product_stock,
        {
            onDelete: "CASCADE"
        }
    )
    variation_item_stocks: VariationItemStock[];

    @Column()
    price_sell: number;

    @Column()
    quantity: number;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
