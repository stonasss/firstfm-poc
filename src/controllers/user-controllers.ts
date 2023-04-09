import userService from "../services/user-service.js"
import { Request, Response, NextFunction } from "express";

async function signUp(req: Request, res: Response, next: NextFunction){
    const { name, email, password } = req.body;

    try {
        await userService.create({ name, email, password });
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function logIn(req: Request, res: Response, next: NextFunction){
    const { email, password } = req.body;

    try {
        const token = await userService.update({ email, password });
        return res.send({ token })
    } catch (err) {
        next(err);
    }
}

async function getUsers(){

}

async function deleteUser(){

}