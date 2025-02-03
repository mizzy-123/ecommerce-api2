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

export enum TypeMediaUlasan {
    IMAGE = "image",
    VIDEO = "video"
}

@Entity()
export class MediaUlasan {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Ulasan)
    @JoinColumn({ name: "ulasan_id" })
    ulasan: Ulasan;
    @Column()
    ulasan_id: number;

    @Column({
        type: "enum",
        enum: TypeMediaUlasan,
        nullable: true
    })
    type: TypeMediaUlasan | null;

    @Column({
        type: "varchar",
        nullable: true
    })
    media_url: string | null;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
