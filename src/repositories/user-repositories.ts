import { db } from "../database/database-connection.js";
import {
    User,
    VerifyEmail,
    VerifyId,
    RegisterUser,
    LogInUser,
} from "../protocols/users.js";
import { QueryResult } from "pg";

async function loginUser(token: string, id: number): Promise<QueryResult<LogInUser>> {
    return await db.query(
        `
        UPDATE users SET token = $1 WHERE id = $2;
        `,
        [token, id]
    );
};

async function createUser({ name, email, password }: RegisterUser): Promise<QueryResult<RegisterUser>>{
    return await db.query(
        `
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
        `,
        [name, email, password]
    );
};

async function getUsers(): Promise<QueryResult<User>>{
    return await db.query(
        `
        SELECT id, name FROM users;
        `
    );
};

async function findByEmail(email: string): Promise<QueryResult<VerifyEmail>>{
    return await db.query(
        `
        SELECT * FROM users WHERE email = $1;
        `,
        [email]
    );
};

async function findById(id: number): Promise<QueryResult<VerifyId>>{
    return await db.query(
        `
        SELECT * FROM users WHERE id = $1;
        `,
        [id]
    );
};

async function deleteUser(id: number){
    return await db.query(
        `
        DELETE FROM users WHERE id=$1;
        `,
        [id]
    );
};

export const userRepositories = {
    createUser,
    loginUser,
    getUsers,
    findByEmail,
    findById,
    deleteUser,
};
