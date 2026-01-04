import { Router } from "express";

import userController from "../controllers/userController.js";
import authorizationController from "../controllers/AuthorizationController.js";

const userRouter = Router();

userRouter.get("/", userController.getUsers);

userRouter.post("/", authorizationController.signUp);

export default userRouter;
