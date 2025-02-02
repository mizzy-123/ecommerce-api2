import slugify from "slugify";
import { AppDataSource } from "../data-source";
import { User } from "../database/entity/User";
import { Product } from "../database/entity/Product";

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

    static async createSlugProduct(name: string): Promise<string> {
        const slugBase = slugify(name, { lower: true, strict: true });
        const productRepository = AppDataSource.getRepository(Product);

        // Mencari semua username yang mirip
        const existingSlugs = await productRepository
            .createQueryBuilder("product")
            .select("product.slug")
            .where("product.slug LIKE :slug", { slug: `${slugBase}%` })
            .getMany();

        if (!existingSlugs.length) {
            return slugBase;
        }

        // Mencari angka unik berdasarkan slug yang sudah ada
        let maxNumber = 0;
        const slugRegex = new RegExp(`^${slugBase}-(\\d+)$`);
        for (const product of existingSlugs) {
            const match = product.slug.match(slugRegex);
            if (match) {
                maxNumber = Math.max(maxNumber, parseInt(match[1], 10));
            }
        }

        return `${slugBase}-${maxNumber + 1}`;
    }
}
