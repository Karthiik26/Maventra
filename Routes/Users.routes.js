import express from "express";
import { Login, Signup, Logout } from "../Controllers/Users.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
userRouter.post("/logout", Logout);

export default userRouter;