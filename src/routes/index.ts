import { Router } from "express";
import { apiRouter } from "./api";
import { publicRouter } from "./public-api";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminRouter } from "./admin";
import { adminMiddleware } from "../middleware/admin.middleware";

export const appRouter = Router();

appRouter.use("/api", publicRouter);
appRouter.use("/api", authMiddleware, apiRouter);
appRouter.use("/api", [authMiddleware, adminMiddleware], adminRouter);
