import { Request } from "express";
import { UserResponse } from "../model/user.model";

export interface AuthRequest extends Request {
    user?: UserResponse;
}
