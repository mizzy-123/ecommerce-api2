import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Ulasan } from "./Ulasan";
import { VariationItem } from "./VariationItem";

@Entity()
export class UlasanVariationItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Ulasan, (ulasan) => ulasan.ulasan_variation_items)
    @JoinColumn({ name: "ulasan_id" })
    ulasan: Ulasan;
    @Column()
    ulasan_id: number;

    @ManyToOne(
        () => VariationItem,
        (variationItem) => variationItem.ulasan_variation_items
    )
    @JoinColumn({ name: "variation_item_id" })
    variation_item: VariationItem;
    @Column()
    variation_item_id: number;
}
