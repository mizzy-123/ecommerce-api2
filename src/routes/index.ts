import { Router } from "express";
import { apiRouter } from "./api";
import { publicRouter } from "./public-api";
import { authMiddleware } from "../middleware/auth.middleware";

export const appRouter = Router();

appRouter.use("/api", publicRouter);
appRouter.use("/api", authMiddleware, apiRouter);
