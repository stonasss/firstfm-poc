import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

type Error = {
    name: string;
    email?: string;
    message?: string;
};

export function handleApplicationErrors(err: Error, req: Request, res: Response, next: NextFunction){
    if (err.name === "InvalidCredentialsError" || err.name === "UnauthorizedError") {
        return res.status(httpStatus.UNAUTHORIZED).send({
            message: err.message,
        });
    }

    if (err.name === "DuplicatedEmailError" || err.name === "ConflictError") {
        return res.status(httpStatus.CONFLICT).send({
            message: err.message,
            email: err.email,
        });
    }

    if (err.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send({
            message: err.message,
        });
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "InternalServerError",
        message: "Internal Server Error",
    });
};
