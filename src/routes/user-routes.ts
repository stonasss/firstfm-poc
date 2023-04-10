import { Router } from "express";
import { userControllers } from "../controllers/user-controllers.js";

const userRoutes = Router();

userRoutes.post("/sign-up", userControllers.signUp);
userRoutes.get("/users", userControllers.getUsers);
userRoutes.put("/log-in", userControllers.logIn);
userRoutes.delete("/delete-user", userControllers.deleteUser);

export default userRoutes;
