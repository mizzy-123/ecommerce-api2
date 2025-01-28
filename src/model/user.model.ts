import { User } from "../entity/User";

export type CreateUserRequest = {
    email: string;
    fullname: string;
    phone: string;
    password: string;
    confirm_password: string;
};

export type UserResponse = {
    id: string;
    email: string;
    fullname: string;
    phone: string;
};

export function toUserResponse(user: User): UserResponse {
    return {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        phone: user.phone
    };
}
