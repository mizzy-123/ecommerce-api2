import { z, ZodType } from "zod";

export class ProductValidation {
    static readonly SHOW_PRODUCT_STOCK: ZodType = z.object({
        variation_item_id_1: z.number().nullable(),
        variation_item_id_2: z.number().nullable()
    });
}
