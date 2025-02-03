import { addHours } from "date-fns";
import { AppDataSource } from "../data-source";
import { Role } from "../database/entity/Role";
import { User } from "../database/entity/User";
import {
    CreateUserRequest,
    LoginRequest,
    toLoginResponse,
    toUserResponse,
    toUserResponseWithToken,
    UserResponse,
    UserResponseWithToken
} from "../model/user.model";
import { UserValidation } from "../validation/user.validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { Email } from "../util/email";
import { ResponseError } from "../error/response.error";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyAcessToken
} from "../util/jwt";
import { Request } from "express";

export class UserService {
    static async refreshToken(req: Request): Promise<UserResponseWithToken> {
        const token = req.params.token;

        if (!token) {
            throw new ResponseError(400, "Invalid or missing token");
        }

        const user = verifyAcessToken(String(token));

        if (user === null || user === undefined)
            throw new ResponseError(401, "Unauthorized");

        const getUser = user as UserResponse;

        const userRepository = AppDataSource.getRepository(User);
        const userData = await userRepository.findOneBy({ id: getUser.id });

        if (!userData) throw new ResponseError(404, "User notfound");

        const loginResponse = toLoginResponse(userData);

        const accessToken = generateAccessToken(loginResponse);
        const refreshToken = generateRefreshToken(loginResponse);

        return toUserResponseWithToken(userData, accessToken, refreshToken);
    }

    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(
            UserValidation.REGISTER,
            request
        );

        const verificationToken = uuidv4();
        const verificationTokenExpires = addHours(new Date(), 24);
        const buyer_id = parseInt(process.env.BUYER_ID!);

        registerRequest.password = await bcrypt.hash(
            registerRequest.password,
            10
        );

        const userRepository = AppDataSource.getRepository(User);
        const roleRepository = AppDataSource.getRepository(Role);
        const buyer = await roleRepository.findOneBy({ id: buyer_id });

        const newUser = userRepository.create({
            email: registerRequest.email,
            fullname: registerRequest.fullname,
            phone: registerRequest.phone,
            password: registerRequest.password,
            verificationToken: verificationToken,
            verificationTokenExpires: verificationTokenExpires,
            roles: [buyer!]
        });

        const savedUser = await userRepository.save(newUser);

        Email.sendVerificationEmail(
            savedUser.email,
            savedUser.verificationToken!
        );

        return toUserResponse(savedUser);
    }

    static async login(request: LoginRequest): Promise<UserResponseWithToken> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: {
                email: loginRequest.email
            },
            relations: {
                roles: true
            }
        });

        if (!user)
            throw new ResponseError(400, "Username or password is wrong");

        const isPasswordValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        );

        if (!isPasswordValid)
            throw new ResponseError(400, "Username or password is wrong");

        if (!user.email_verified_at)
            throw new ResponseError(401, "Your account not verified");

        const loginResponse = toLoginResponse(user);

        const accessToken = generateAccessToken(loginResponse);
        const refreshToken = generateRefreshToken(loginResponse);

        return toUserResponseWithToken(user, accessToken, refreshToken);
    }

    static async verifyEmail(token: string | null | undefined) {
        if (!token) throw new ResponseError(400, "Invalid or missing token");

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({
            verificationToken: token
        });

        if (!user)
            throw new ResponseError(400, "Invalid token or user not found");

        if (
            user.verificationTokenExpires &&
            new Date() > user.verificationTokenExpires
        ) {
            throw new ResponseError(
                400,
                "Token expired, please request a new verification email"
            );
        }

        user.email_verified_at = new Date();
        user.verificationToken = null;
        user.verificationTokenExpires = null;
        await userRepository.save(user);
    }

    static async resendVerificationEmail(email: string | null | undefined) {
        if (!email) throw new ResponseError(400, "Invalid or missing email");

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({
            email: email
        });

        if (!user) throw new ResponseError(400, "User not found");

        const verificationToken = uuidv4();
        const verificationTokenExpires = addHours(new Date(), 24);

        user.verificationToken = verificationToken;
        user.verificationTokenExpires = verificationTokenExpires;
        await userRepository.save(user);

        Email.sendVerificationEmail(user.email, user.verificationToken);
    }
}
