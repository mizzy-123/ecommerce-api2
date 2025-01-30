import "dotenv/config";
import jsonWebToken from "jsonwebtoken";
import { LoginResponse } from "../model/user.model";

export const generateAccessToken = (user: LoginResponse): string => {
    return jsonWebToken.sign(user, process.env.JWT_SECRET ?? "defaultSecret", {
        expiresIn: "3h" // Gunakan default 1800s jika tidak diatur
    });
};

export const generateRefreshToken = (user: LoginResponse): string => {
    const now = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
    const oneMonthInSeconds = 30 * 24 * 60 * 60; // 30 hari x 24 jam x 60 menit x 60 detik
    const expiresIn = now + oneMonthInSeconds;
    return jsonWebToken.sign(user, String(process.env.JWT_REFRESH_SECRET!), {
        expiresIn: expiresIn
    });
};

export const verifyRefreshToken = (
    token: string
): string | jsonWebToken.JwtPayload => {
    return jsonWebToken.verify(token, String(process.env.JWT_REFRESH_SECRET!));
};

export const parseJWT = (token: string) => {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export const verifyAcessToken = (
    token: string
): string | jsonWebToken.JwtPayload | null => {
    return jsonWebToken.verify(token, String(process.env.JWT_SECRET));
};
