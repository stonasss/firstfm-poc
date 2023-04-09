import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { userRepositories } from "../repositories/user-repositories.js";
import { errors } from "../errors/index.js";
import { RegisterUser, LogInUser } from "../protocols/users.js";

async function update({ email, password }: LogInUser) {
    const { 
        rowCount, 
        rows: [user],
    } = await userRepositories.findByEmail(email);
    if (!rowCount) throw errors.invalidCredentialsError(email);

    const correctPasswd = bcrypt.compare(password, user.password);
    if (!correctPasswd) throw errors.invalidCredentialsError(email);

    if (!user.token) {    
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
        await userRepositories.loginUser(token, user.id);
        return token;
    }
}

async function create({ name, email, password }: RegisterUser) {
    const {rowCount} = await userRepositories.findByEmail(email);
    if (rowCount) throw errors.duplicatedEmail(email);

    const hashedPasswd: string = await bcrypt.hash(password, 10);
    await userRepositories.createUser({
        name,
        email,
        password: hashedPasswd,
    });
}

export const userServices = {
    create,
    update,
}