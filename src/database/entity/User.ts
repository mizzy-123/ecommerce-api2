import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
    BeforeInsert
} from "typeorm";
import { Address } from "./Address";
import { Role } from "./Role";
import { Slug } from "../../util/slug";
import { Ulasan } from "./Ulasan";

export enum Gender {
    LAKI = "laki",
    PEREMPUAN = "perempuan"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(() => Ulasan, (ulasan) => ulasan.user, {
        onDelete: "CASCADE"
    })
    ulasans: Ulasan[];

    @OneToMany(() => Address, (address) => address.user, {
        onDelete: "CASCADE"
    })
    addresses: Address[];

    @ManyToMany(() => Role, (role) => role.users, { onDelete: "CASCADE" })
    @JoinTable({
        name: "user_role",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "role_id",
            referencedColumnName: "id"
        }
    })
    roles: Role[];

    @Column({
        type: "varchar",
        length: 100,
        unique: true
    })
    email: string;

    @Column({
        type: "varchar",
        length: 100
    })
    password: string;

    @Column({
        type: "varchar",
        length: 100
    })
    fullname: string;

    @Column({
        type: "varchar",
        length: 100,
        unique: true
    })
    username: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    phone: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    photo: string;

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.LAKI,
        nullable: true
    })
    gender: Gender;

    @Column({
        type: "timestamp",
        nullable: true
    })
    email_verified_at: Date | null;

    @Column({ type: "timestamp", nullable: true })
    verificationTokenExpires: Date | null;

    @Column({ type: "varchar", nullable: true })
    verificationToken: string | null;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @BeforeInsert()
    generateSlug() {
        if (this.fullname) {
            return Slug.createUsernameEntityUser(this.fullname).then((slug) => {
                this.username = slug;
            });
        }
    }
}
