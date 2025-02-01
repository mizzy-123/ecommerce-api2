import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Variation } from "./Variation";
import { VariationItemStock } from "./VariationItemStock";

@Entity()
export class VariationItem {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Variation, (variation) => variation.variation_items)
    @JoinColumn({ name: "variation_id" })
    variation: Variation;
    @Column()
    variation_id: number;

    @OneToMany(
        () => VariationItemStock,
        (variationItemStock) => variationItemStock.variation_item_1,
        { onDelete: "CASCADE" }
    )
    variation_item_stock_1: VariationItemStock[];

    @OneToMany(
        () => VariationItemStock,
        (variationItemStock) => variationItemStock.variation_item_2,
        { onDelete: "CASCADE" }
    )
    variation_item_stock_2: VariationItemStock[];

    @Column({
        type: "varchar",
        length: 100
    })
    name: string;

    @Column()
    image_url: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
