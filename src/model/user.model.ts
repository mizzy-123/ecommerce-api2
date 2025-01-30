import { Role } from "../database/entity/Role";
import { User } from "../database/entity/User";

export type CreateUserRequest = {
    email: string;
    fullname: string;
    phone: string;
    password: string;
    confirm_password: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    id: string;
    email: string;
    fullname: string;
    username: string;
    phone: string;
};

export type UserResponseWithToken = {
    access_token: string;
    refresh_token: string;
    email: string;
    fullname: string;
    username: string;
    phone: string;
    roles: Role[];
};

export type UserResponse = {
    id: string;
    email: string;
    fullname: string;
    username: string;
    phone: string;
};

export function toUserResponseWithToken(
    user: User,
    access_token: string,
    refresh_token: string
): UserResponseWithToken {
    return {
        access_token: access_token,
        refresh_token: refresh_token,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        phone: user.phone,
        roles: user.roles
    };
}

export function toLoginResponse(user: User): LoginResponse {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        phone: user.phone
    };
}

export function toUserResponse(user: User): UserResponse {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        phone: user.phone
    };
}
