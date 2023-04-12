import prisma from "../database/database-connection.js";
import {
    VerifyLogin,
    RegisterUser,
    LogInUser,
} from "../protocols/users.js";

/* async function loginUser(token: string, id: number): Promise<QueryResult<LogInUser>> {
    return await db.query(
        `
        UPDATE users SET token = $1 WHERE id = $2;
        `,
        [token, id]
    );
}; */

/* async function loginUser({token, id}: VerifyLogin) {
    return prisma.sessions.upsert({
        where: {
            id: id || 0,
        },
        create: token
    })
};
 */
async function createUser({name, email, password}: RegisterUser){
    return prisma.users.create({
        data: {
            name, 
            email, 
            password,
        }
    })
};

async function getUsers(){
    return prisma.users.findMany;
};

async function findByEmail(email: string) {
    return prisma.users.findFirst({
        where: {
            email: email
        },
    })
};

async function findById(id: number) {
    return prisma.users.findFirst({
        where: {
            id: id
        },
    })
};

async function deleteUser(id: number) {
    return prisma.users.delete({
        where: {
            id: id
        },
    })
};

export const userRepositories = {
    createUser,
/*     loginUser, */
    getUsers,
    findByEmail,
    findById,
    deleteUser,
};
