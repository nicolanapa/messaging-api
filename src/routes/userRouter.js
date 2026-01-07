import { Router } from "express";

import userController from "../controllers/userController.js";
import authorizationController from "../controllers/AuthorizationController.js";
import { userValidator } from "../scripts/userValidator.js";
import userAccessVerifier from "../scripts/userAccessVerifier.js";

const userRouter = Router();

userRouter.get("/", userController.getUsers);

userRouter.post("/", userValidator, authorizationController.signUp);

userRouter.get("/:id", userController.getUser);

userRouter.delete("/:id", userAccessVerifier, userController.deleteUser);

userRouter.put("/:id/update", userAccessVerifier, userController.updateUser);

userRouter.get("/:id/status", /* friends only ,*/ userController.getUserStatus);

userRouter.put(
    "/:id/status",
    userAccessVerifier,
    userController.updateUserStatus,
);

userRouter.get("/:id/publicKey", userController.getUserPublicKey);

userRouter.put(
    "/:id/publicKey",
    userAccessVerifier,
    userController.updateUserPublicKey,
);

// Friend requests and friend list routes, not yet decided

// userRouter.get("/:id/blockedList", userAccessVerifier, userController.getUserBlockedList);

/* modified userAccessVerifier that only verifies if authenticated ,*/
// userRouter.put("/:id/block", userController.blockUser);

// userRouter.put("/:id/unblock", userController.unblockUser);

userRouter.get("/:id/chat", userAccessVerifier, userController.getUserChats);

export default userRouter;
