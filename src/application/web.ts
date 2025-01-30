import express from "express";
import cors from "cors";
import { appRouter } from "../routes";
import { errorMiddleware } from "../middleware/error.middleware";
import { notFoundMiddleware } from "../middleware/notfound.middleware";

export const web = express();

web.use("/public", express.static("./public"));

web.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    })
);

web.options("*", cors());
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(appRouter);
web.use(notFoundMiddleware);
web.use(errorMiddleware);
