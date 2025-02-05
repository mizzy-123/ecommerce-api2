import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Ulasan } from "./Ulasan";

@Entity()
export class UlasanLike {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Ulasan, (ulasan) => ulasan.ulasan_likes)
    @JoinColumn({ name: "ulasan_id" })
    ulasan: Ulasan;
    @Column()
    ulasan_id: number;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
