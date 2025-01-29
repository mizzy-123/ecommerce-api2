import { AppDataSource } from "../../data-source";
import { Role } from "../entity/Role";

export const RoleSeeder = async () => {
    try {
        const roleRepository = AppDataSource.getRepository(Role);

        const roles: Partial<Role>[] = [
            { name: "buyer" },
            { name: "seller" },
            { name: "admin" }
        ];

        await roleRepository.insert(roles);

        console.log("Role seeding completed!");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in RoleSeeder:", error.message);
        } else {
            console.error("Error in RoleSeeder:", error);
        }
    }
};
