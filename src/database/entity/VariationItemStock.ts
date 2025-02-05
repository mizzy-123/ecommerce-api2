import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { VariationItem } from "./VariationItem";
import { ProductStock } from "./ProductStock";

@Entity()
export class VariationItemStock {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => ProductStock,
        (productStock) => productStock.variation_item_stocks
    )
    @JoinColumn({ name: "product_stock_id" })
    product_stock: ProductStock;
    @Column()
    product_stock_id: number;

    @ManyToOne(
        () => VariationItem,
        (variationItem) => variationItem.variation_item_stock_1
    )
    @JoinColumn({ name: "variation_item_id_1" })
    variation_item_1: VariationItem;
    @Column()
    variation_item_id_1: number;

    @ManyToOne(
        () => VariationItem,
        (variationItem) => variationItem.variation_item_stock_2
    )
    @JoinColumn({ name: "variation_item_id_2" })
    variation_item_2: VariationItem;
    @Column({ nullable: true })
    variation_item_id_2: number | null;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
