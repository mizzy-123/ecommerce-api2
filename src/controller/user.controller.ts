import { NextFunction, Request, Response } from "express";
import {
    AddAddressRequest,
    CreateUserRequest,
    LoginRequest
} from "../model/user.model";
import { UserService } from "../service/user.service";
import { AuthRequest } from "../request/auth.request";

export class UserController {
    static async addAddress(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const request: AddAddressRequest = req.body as AddAddressRequest;
            const response = await UserService.addAdress(request, req.user!);

            res.status(201).json({
                code: 201,
                message: "Address has been created",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UserService.refreshToken(req);
            res.status(200).json({
                code: 200,
                message: "Refresh token successfull",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

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

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginRequest = req.body as LoginRequest;
            const response = await UserService.login(request);

            res.status(200).json({
                code: 200,
                message: "Login successfull",
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
