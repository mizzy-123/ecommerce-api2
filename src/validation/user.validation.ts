import { z, ZodType } from "zod";

export class UserValidation {
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
}
