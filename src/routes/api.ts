import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controller/user.controller";

export const apiRouter = Router();

apiRouter.get("/test", (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            message: "test"
        });
    } catch (error) {
        next(error);
    }
});

apiRouter.post("/address", UserController.addAddress);
