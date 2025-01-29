import { NextFunction, Request, Response } from "express";
import { CreateUserRequest } from "../model/user.model";
import { UserService } from "../service/user.service";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;
            const response = await UserService.register(request);

            res.status(201).json({
                code: 201,
                message:
                    "Your account has been created, please verify your email",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async verifyEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.query;
            await UserService.verifyEmail(token as string);

            res.status(200).json({
                code: 200,
                message: "Email successfully verified"
            });
        } catch (error) {
            next(error);
        }
    }

    static async resendVerificationEmail(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { email } = req.body;
            await UserService.resendVerificationEmail(email as string);

            res.status(200).json({
                code: 200,
                message: "Verification email resent"
            });
        } catch (error) {
            next(error);
        }
    }
}
