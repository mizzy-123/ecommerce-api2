import { z, ZodType } from "zod";

export class UserValidation {
    static readonly ADD_ADDRESS: ZodType = z.object({
        fullname: z.string().min(1).max(100),
        phone: z.string().min(1).max(100),
        province: z.string().min(1).max(100).nullish(),
        city: z.string().min(1).max(100).nullish(),
        subdistrict: z.string().min(1).max(100).nullish(),
        postal_code: z.string().min(1).max(100).nullish(),
        street: z.string().min(1).nullish(),
        instructions: z.string().min(1).nullish(),
        province_id: z.number().nullish(),
        subdistrict_id: z.number().nullish(),
        city_id: z.number().nullish()
    });

    static readonly REGISTER: ZodType = z
        .object({
            email: z.string().email(),
            fullname: z.string().min(1).max(100),
            phone: z.string().min(1).max(100),
            password: z.string().min(1).max(100),
            password_confirmation: z.string().min(1).max(100)
        })
        .refine((data) => data.password === data.password_confirmation, {
            message: "Password and confirm password must match",
            path: ["password_confirmation"]
        })
        // Validasi untuk memastikan password memiliki minimal panjang
        .refine((data) => data.password.length >= 8, {
            message: "Password must be at least 8 characters long",
            path: ["password"]
        });

    static readonly LOGIN: ZodType = z.object({
        email: z.string().email(),
        password: z.string().min(1)
    });
}
