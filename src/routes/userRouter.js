import { Router } from "express";

import userController from "../controllers/userController.js";
import authorizationController from "../controllers/AuthorizationController.js";
import {
    userPublicKeyValidator,
    userStatusValidator,
    updateUserValidator,
    userValidator,
} from "../scripts/userValidator.js";
import userAuthorizationVerifier from "../scripts/userAuthorizationVerifier.js";
import formValidation from "../scripts/formValidation.js";
import friendController from "../controllers/friendController.js";
import blockController from "../controllers/blockController.js";

const userRouter = Router();

userRouter.get("/", userController.getUsers);

userRouter.post(
    "/",
    userValidator,
    formValidation,
    authorizationController.signUp,
);

userRouter.get("/:id", userController.getUser);

userRouter.delete("/:id", userAuthorizationVerifier, userController.deleteUser);

userRouter.put(
    "/:id/update",
    userAuthorizationVerifier,
    updateUserValidator,
    formValidation,
    userController.updateUser,
);

userRouter.get("/:id/status", /* friends only ,*/ userController.getUserStatus);

userRouter.put(
    "/:id/status",
    userAuthorizationVerifier,
    userStatusValidator,
    formValidation,
    userController.updateUserStatus,
);

userRouter.get("/:id/publicKey", userController.getUserPublicKey);

userRouter.put(
    "/:id/publicKey",
    userAuthorizationVerifier,
    userPublicKeyValidator,
    formValidation,
    userController.updateUserPublicKey,
);

// Friend Feature

userRouter.get(
    "/:id/friendList",
    userAuthorizationVerifier,
    friendController.getUserFriendList,
);

userRouter.put(
    "/:id/friendList/:friendUserId/remove",
    userAuthorizationVerifier,
    friendController.removeUserFriend,
);

// In this case :id is seen as "receiverUserId"
userRouter.get(
    "/:id/friendRequest",
    userAuthorizationVerifier,
    friendController.getUserFriendRequests,
);

// In this case :id is seen as "senderUserId"
userRouter.put(
    "/:id/friendRequest/:receiverUserId/sendRequest",
    userAuthorizationVerifier,
    friendController.sendFriendRequest,
);

// In this case :id is seen as "senderUserId"
userRouter.put(
    "/:id/friendRequest/:receiverUserId/cancelRequest",
    userAuthorizationVerifier,
    friendController.cancelFriendRequest,
);

// In this case :id is seen as "receiverUserId"
userRouter.post(
    "/:id/friendRequest/:senderUserId/decision",
    userAuthorizationVerifier,
    // validate req.body.decision being ["ACCEPT", "REFUSE"]
    formValidation,
    friendController.handleFriendRequest,
);

// Block Feature

userRouter.get(
    "/:id/blockedList",
    userAuthorizationVerifier,
    blockController.getUserBlockedList,
);

/* modified userAuthorizationVerifier that only verifies if authenticated ,*/
userRouter.put("/:id/block", blockController.blockUser);

userRouter.put("/:id/unblock", blockController.unblockUser);

// Other

userRouter.get("/:id/chat", userAuthorizationVerifier, userController.getUserChats);

export default userRouter;
