import prisma from "../database/database-connection.js";
import { RegisterUser } from "../protocols/users.js";

async function loginUser(token: string) {
    return prisma.sessions.update({
        where: {
            id: 0,
        },
        data: {
            token: token,
        },
    })
};

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

async function findSession(id: number) {
    return prisma.sessions.findFirst({
        where: {
            id,
        },
    })
};

async function findById(id: number) {
    return prisma.users.findFirst({
        where: {
            id,
        },
    })
};

async function deleteUser(id: number) {
    return prisma.users.delete({
        where: {
            id,
        },
    })
};

export const userRepositories = {
    createUser,
    loginUser,
    getUsers,
    findByEmail,
    findById,
    findSession,
    deleteUser,
};
