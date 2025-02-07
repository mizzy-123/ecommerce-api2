import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "./User";
import { AddressApi } from "./AddressApi";

@Entity()
export class Address {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => AddressApi, (addressApi) => addressApi.address)
    address_api: AddressApi;

    @ManyToOne(() => User, (user) => user.addresses)
    @JoinColumn({ name: "user_id" })
    user: User;
    @Column()
    user_id: string;

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
    phone: string | null;

    @Column({
        type: "varchar",
        nullable: true
    })
    province: string | null;

    @Column({
        type: "varchar",
        nullable: true
    })
    city: string | null;

    @Column({
        type: "varchar",
        nullable: true
    })
    subdistrict: string | null;

    @Column({
        type: "varchar",
        nullable: true
    })
    postal_code: string | null;

    @Column({
        type: "varchar",
        nullable: true
    })
    street: string | null;

    @Column({
        type: "text",
        nullable: true
    })
    instructions: string | null;

    @Column({
        type: "boolean",
        default: false
    })
    use: boolean;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
