import { Router } from "express";
import { UserController } from "../controller/user.controller";

export const publicRouter = Router();

publicRouter.post("/login");
publicRouter.post("/register", UserController.register);
