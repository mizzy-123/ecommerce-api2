import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { ProductController } from "../controller/product.controller";
import { UlasanController } from "../controller/ulasan.controller";

export const publicRouter = Router();

// Authentication
publicRouter.post("/login", UserController.login);
publicRouter.post("/register", UserController.register);
publicRouter.get("/verify-email", UserController.verifyEmail);
publicRouter.get("/refresh-token/:token", UserController.refreshToken);
publicRouter.post(
    "/resend-verification",
    UserController.resendVerificationEmail
);

// Product
publicRouter.get("/product", ProductController.show);
publicRouter.post("/product/stock", ProductController.showProductStock);
publicRouter.get("/product/:slug", ProductController.detail);

// Ulasan
publicRouter.get("/ulasan/product/:productId", UlasanController.showAll);
publicRouter.get(
    "/generate-productqr-pdf",
    ProductController.exportProductQrPdf
);
