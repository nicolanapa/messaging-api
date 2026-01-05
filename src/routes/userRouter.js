import { Router } from "express";

import userController from "../controllers/userController.js";
import authorizationController from "../controllers/AuthorizationController.js";
import { userValidator } from "../scripts/userValidator.js";

const userRouter = Router();

userRouter.get("/", userController.getUsers);

userRouter.post("/", userValidator, authorizationController.signUp);

userRouter.get("/:id", userController.getUser);

userRouter.delete(
    "/:id",
    /* passport + identify user helper, 
    also used in most of the other routes ,*/ authorizationController.signUp,
);

userRouter.put("/:id/update", /* passport ,*/ authorizationController.signUp);

userRouter.get("/:id/status", /* passport ,*/ authorizationController.signUp);

userRouter.put("/:id/status", /* passport ,*/ authorizationController.signUp);

userRouter.get("/:id/publicKey", authorizationController.signUp);

userRouter.put(
    "/:id/publicKey",
    /* passport ,*/ authorizationController.signUp,
);

// Friend requests and friend list routes, not yet decided

// userRouter.get("/:id/blockedList", /* passport ,*/ authorizationController.signUp);

// userRouter.put("/:id/block", /* passport ,*/ authorizationController.signUp);

// userRouter.put("/:id/unblock", /* passport ,*/ authorizationController.signUp);

userRouter.get("/:id/chat", /* passport ,*/ authorizationController.signUp);

export default userRouter;
