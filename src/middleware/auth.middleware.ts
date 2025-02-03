import { NextFunction, Response } from "express";
import { AuthRequest } from "../request/auth.request";
import { verifyAcessToken } from "../util/jwt";
import { UserResponse } from "../model/user.model";

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    const bearer = authHeader?.split(" ")[0];

    if (!authHeader) {
        next();
        return;
    }

    const user = verifyAcessToken(String(token));

    if (
        bearer === undefined ||
        bearer !== "Bearer" ||
        token === undefined ||
        user === null ||
        user === undefined
    ) {
        res.status(401).json({
            code: 401,
            message: "Unauthenticated"
        });
        return;
    }

    if (user !== null || user !== undefined) {
        req.user = user as UserResponse;
    }

    next();
};
