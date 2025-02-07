import { NextFunction, Response } from "express";
import { AuthRequest } from "../request/auth.request";
import { AppDataSource } from "../data-source";
import { User } from "../database/entity/User";

export const adminMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const userRepo = AppDataSource.getRepository(User);
    const admin_id = parseInt(process.env.ADMIN_ID || "0");

    // Cek apakah user sudah login
    if (!req.user) {
        return res.status(401).json({ code: 401, message: "Unauthenticated" });
    }

    // Ambil data user beserta roles
    const dataUser = await userRepo.findOne({
        where: { id: req.user.id },
        relations: { roles: true }
    });

    // Cek apakah user ditemukan
    if (!dataUser) {
        return res.status(400).json({ code: 400, message: "User not found" });
    }

    // Cek apakah user memiliki role admin
    const hasAdminRole = dataUser.roles?.some((role) => role.id === admin_id);

    if (!hasAdminRole) {
        return res.status(401).json({ code: 401, message: "Unauthorized" });
    }

    // Lanjut ke middleware/controller berikutnya
    next();
};
