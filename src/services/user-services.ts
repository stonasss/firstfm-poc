import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

async function update({ email, password }) {
    const { 
        rowCount, 
        rows: [user],
    } = await userRepositories.findByEmail(email);
    if (!rowCount) throw errors.invalidCredentialsError();

    const correctPasswd = bcrypt.compare(password, user.password);
    if (!correctPasswd) throw errors.invalidCredentialsError();

    if (!user.token) {    
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
        await userRepositories.loginUser(token, user.id);
        return token;
    }
} 