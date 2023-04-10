import { userServices } from "../services/user-services.js"
import { Request, Response, NextFunction } from "express";

async function signUp(req: Request, res: Response, next: NextFunction){
    const { name, email, password } = req.body;

    try {
        await userServices.createUser({ name, email, password });
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function logIn(req: Request, res: Response, next: NextFunction){
    const { email, password } = req.body;

    try {
        const token = await userServices.updateUser({ email, password });
        return res.send({ token })
    } catch (err) {
        next(err);
    }
}

async function getUsers(){

}

async function deleteUser(){

}