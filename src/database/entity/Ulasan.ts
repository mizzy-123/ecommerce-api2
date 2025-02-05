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
import { User } from "./User";
import { Product } from "./Product";
import { MediaUlasan } from "./MediaUlasan";
import { UlasanVariationItem } from "./UlasanVariationItem";
import { UlasanLike } from "./UlasanLike";

@Entity()
export class Ulasan {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => UlasanLike, (ulasanLike) => ulasanLike.ulasan, {
        onDelete: "CASCADE"
    })
    ulasan_likes: UlasanLike[];

    @OneToMany(
        () => UlasanVariationItem,
        (ulasanVariationItem) => ulasanVariationItem.ulasan,
        { onDelete: "CASCADE" }
    )
    ulasan_variation_items: UlasanVariationItem[];

    @OneToMany(() => MediaUlasan, (mediaUlasan) => mediaUlasan.ulasan, {
        onDelete: "CASCADE"
    })
    media_ulasans: MediaUlasan[];

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product: Product;
    @Column({
        type: "uuid"
    })
    product_id: string;

    @ManyToOne(() => User, (user) => user.ulasans)
    @JoinColumn({ name: "user_id" })
    user: User;
    @Column({
        type: "uuid"
    })
    user_id: string;

    @Column({
        type: "text"
    })
    ulasan: string;

    @Column()
    star: number;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
