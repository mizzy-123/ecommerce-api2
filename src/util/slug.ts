import slugify from "slugify";
import { AppDataSource } from "../data-source";
import { User } from "../database/entity/User";

export class Slug {
    static async createUsernameEntityUser(name: string): Promise<string> {
        const slugBase = slugify(name, { lower: true, strict: true });
        const userRepository = AppDataSource.getRepository(User);

        // Mencari semua username yang mirip
        const existingSlugs = await userRepository
            .createQueryBuilder("user")
            .select("user.username")
            .where("user.username LIKE :slug", { slug: `${slugBase}%` })
            .getMany();

        if (!existingSlugs.length) {
            return slugBase;
        }

        // Mencari angka unik berdasarkan slug yang sudah ada
        let maxNumber = 0;
        const slugRegex = new RegExp(`^${slugBase}-(\\d+)$`);
        for (const user of existingSlugs) {
            const match = user.username.match(slugRegex);
            if (match) {
                maxNumber = Math.max(maxNumber, parseInt(match[1], 10));
            }
        }

        return `${slugBase}-${maxNumber + 1}`;
    }
}
