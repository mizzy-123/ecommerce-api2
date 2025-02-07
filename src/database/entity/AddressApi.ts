import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Address } from "./Address";

@Entity()
export class AddressApi {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Address, (address) => address.address_api)
    @JoinColumn({ name: "address_id" })
    address: Address;
    @Column()
    address_id: number;

    @Column({
        type: "int",
        nullable: true
    })
    province_id: number | null;

    @Column({
        type: "int",
        nullable: true
    })
    city_id: number | null;

    @Column({
        type: "int",
        nullable: true
    })
    subdistrict_id: number | null;
}
