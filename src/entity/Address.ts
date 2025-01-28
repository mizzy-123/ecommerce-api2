import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Address {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    fullname: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    phone: string;

    @Column({
        nullable: true
    })
    province: string;

    @Column({
        nullable: true
    })
    city: string;

    @Column({
        nullable: true
    })
    subdistrict: string;

    @Column({
        nullable: true
    })
    postal_code: string;

    @Column({
        nullable: true
    })
    street: string;

    @Column({
        type: "text",
        nullable: true
    })
    instructions: string;

    @Column({
        type: "boolean",
        default: false
    })
    use: boolean;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.addresses, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;
}
