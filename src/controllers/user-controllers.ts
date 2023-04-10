import { userServices } from "../services/user-services.js"
import { Request, Response, NextFunction } from "express";
import { VerifyId, LogInUser, RegisterUser } from "../protocols/users.js";
import { logInSchema, registerSchema } from "../schemas/user-schema.js";

async function signUp(req: Request, res: Response, next: NextFunction){
    const newUser = req.body as RegisterUser;
    const { error } = registerSchema.validate(newUser);

    if (error) {
        return res.status(400).send({
            message: error.message,
        });
    }
    const { name, email, password } = req.body as RegisterUser;

    try {
        await userServices.createUser({ name, email, password });
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    };
};

async function logIn(req: Request, res: Response, next: NextFunction){
    const newLogin = req.body as LogInUser;
    const { error } = logInSchema.validate(newLogin);

    if (error) {
        return res.status(400).send({
            message: error.message,
        });
    }
    const { email, password } = req.body as LogInUser;

    try {
        const token = await userServices.updateUser({ email, password });
        return res.send({ token });
    } catch (err) {
        next(err);
    };
};

async function getUsers(req: Request, res: Response, next: NextFunction){
    try {
        const users = await userServices.retrieveUsers();
        return res.send({ users });
    } catch (err) {
        next(err);
    };
};

async function deleteUser(req: Request, res: Response, next: NextFunction){
    const { id } = req.body as VerifyId;

    try {
        await userServices.deleteUser(id);
        return res.sendStatus(204);
    } catch (err) {
        next(err);
    };
};

export const userControllers = {
    signUp,
    logIn,
    getUsers,
    deleteUser,
};
