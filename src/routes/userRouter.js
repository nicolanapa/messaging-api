import { Router } from "express";

import userController from "../controllers/userController.js";
import authorizationController from "../controllers/AuthorizationController.js";
import { userValidator } from "../scripts/userValidator.js";

const userRouter = Router();

userRouter.get("/", userController.getUsers);

userRouter.post("/", userValidator, authorizationController.signUp);

userRouter.get("/:id", userController.getUser);

export default userRouter;
