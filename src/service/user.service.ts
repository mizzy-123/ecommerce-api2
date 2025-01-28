import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import {
    CreateUserRequest,
    toUserResponse,
    UserResponse
} from "../model/user.model";
import { UserValidation } from "../validation/user.validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcryptjs";

export class UserService {
    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(
            UserValidation.REGISTER,
            request
        );

        registerRequest.password = await bcrypt.hash(
            registerRequest.password,
            10
        );

        const userRepository = AppDataSource.getRepository(User);

        const newUser = userRepository.create({
            email: registerRequest.email,
            fullname: registerRequest.fullname,
            phone: registerRequest.phone,
            password: registerRequest.password
        });

        const savedUser = await userRepository.save(newUser);

        return toUserResponse(savedUser);
    }
}
