import "dotenv/config";
import jsonWebToken from "jsonwebtoken";
import { UserResponse } from "../model/user.model";

export const generateAccessToken = (user: UserResponse): string => {
    return jsonWebToken.sign(user, process.env.JWT_SECRET ?? "defaultSecret", {
        expiresIn: "1800s" // Gunakan default 1800s jika tidak diatur
    });
};

export const generateRefreshToken = (user: UserResponse): string => {
    return jsonWebToken.sign(user, String(process.env.JWT_REFRESH_SECRET), {
        expiresIn: "1800s"
    });
};

export const verifyRefreshToken = (
    token: string
): string | jsonWebToken.JwtPayload => {
    return jsonWebToken.verify(token, String(process.env.JWT_REFRESH_SECRET));
};

export const parseJWT = (token: string) => {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export const verifyAcessToken = (
    token: string
): string | jsonWebToken.JwtPayload | null => {
    return jsonWebToken.verify(token, String(process.env.JWT_SECRET));
};
