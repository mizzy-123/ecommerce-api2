import { AppDataSource } from "../../data-source";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";

export const UserSeeder = async () => {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const buyer_id = parseInt(process.env.BUYER_ID!);
        const seller_id = parseInt(process.env.SELLER_ID!);
        const admin_id = parseInt(process.env.ADMIN_ID!);
        const roleRepository = queryRunner.manager.getRepository(Role);
        const buyer = await roleRepository.findOneBy({ id: buyer_id });
        const seller = await roleRepository.findOneBy({ id: seller_id });
        const admin = await roleRepository.findOneBy({ id: admin_id });
        const now = new Date();

        const password = await bcrypt.hash("1234567890", 10);

        const dataUser = [
            {
                email: "titonimepro@gmail.com",
                fullname: "Titan pro",
                phone: "082141765355",
                password: password,
                email_verified_at: now,
                roles: [buyer!]
            },
            {
                email: "mizzy12342@gmail.com",
                fullname: "Mizzy",
                phone: "082141765353",
                password: password,
                email_verified_at: now,
                roles: [seller!]
            },
            {
                email: "manifestasi22@gmail.com",
                fullname: "Manifestasi",
                phone: "082141765356",
                password: password,
                email_verified_at: now,
                roles: [admin!]
            }
        ];

        const insertUser: User[] = [];
        for (const d of dataUser) {
            const user = new User();
            user.email = d.email;
            user.fullname = d.fullname;
            user.phone = d.phone;
            user.password = d.password;
            user.email_verified_at = d.email_verified_at;
            user.roles = d.roles;

            insertUser.push(user);
        }

        // Simpan instance ke database
        await queryRunner.manager.save(insertUser);

        await queryRunner.commitTransaction();
        console.log("User seeding completed!");
    } catch (error) {
        console.error("Error in UserSeeder:", error);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
};
