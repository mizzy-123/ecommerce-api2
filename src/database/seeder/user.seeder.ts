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
        const roleRepository = queryRunner.manager.getRepository(Role);
        const buyer = await roleRepository.findOneBy({ id: buyer_id });
        const seller = await roleRepository.findOneBy({ id: seller_id });
        const now = new Date();

        const password = await bcrypt.hash("1234567890", 10);

        // Buat instance dari entitas User
        const user1 = new User();
        user1.email = "titonimepro@gmail.com";
        user1.fullname = "Titan pro";
        user1.phone = "082141765355";
        user1.password = password;
        user1.email_verified_at = now;
        user1.roles = [buyer!];

        const user2 = new User();
        user2.email = "mizzy12342@gmail.com";
        user2.fullname = "Mizzy";
        user2.phone = "082141765353";
        user2.password = password;
        user2.email_verified_at = now;
        user2.roles = [seller!];

        // Simpan instance ke database
        await queryRunner.manager.save([user1, user2]);

        await queryRunner.commitTransaction();
        console.log("User seeding completed!");
    } catch (error) {
        console.error("Error in UserSeeder:", error);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
};
