import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { ProductController } from "../controller/product.controller";

export const publicRouter = Router();

publicRouter.post("/login", UserController.login);
publicRouter.post("/register", UserController.register);
publicRouter.get("/verify-email", UserController.verifyEmail);
publicRouter.post(
    "/resend-verification",
    UserController.resendVerificationEmail
);
publicRouter.get("/product", ProductController.show);
publicRouter.get("/refresh-token/:token", UserController.refreshToken);
