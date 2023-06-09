import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { userRepositories } from "../repositories/user-repositories.js";
import { errors } from "../errors/index.js";
import { RegisterUser, LogInUser } from "../protocols/users.js";

async function updateUser({ email, password }: LogInUser) {
    const user = await userRepositories.findByEmail(email);

    if (!user) throw errors.invalidCredentialsError(email);
    const correctPasswd = bcrypt.compare(password, user.password);

    if (!correctPasswd) throw errors.invalidCredentialsError(email);

    const userToken = await userRepositories.findSession(user.id)
    if (!userToken.id) {    
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
        await userRepositories.loginUser(token);
        return token;
    }
    return userToken.token;
};

async function createUser({ name, email, password }: RegisterUser) {
    const result = await userRepositories.findByEmail(email);

    if (result) throw errors.duplicatedEmail(email);
    const hashedPasswd: string = await bcrypt.hash(password, 10);
    await userRepositories.createUser({
        name,
        email,
        password: hashedPasswd,
    });
};

async function retrieveUsers() {
    const result = await userRepositories.getUsers();

    if (!result) throw errors.notFoundError();
    return result;
};

async function deleteUser(id: number) {
    const result = await userRepositories.findById(id);

    if (!result) throw errors.notFoundError();
    await userRepositories.deleteUser(id);
};

export const userServices = {
    createUser,
    updateUser,
    retrieveUsers,
    deleteUser,
};
