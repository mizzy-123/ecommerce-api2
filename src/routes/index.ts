import { Router } from "express";
import { apiRouter } from "./api";
import { publicRouter } from "./public-api";

export const appRouter = Router();

appRouter.use("/api", publicRouter);
appRouter.use("/api", apiRouter);
