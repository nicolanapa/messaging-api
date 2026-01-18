import { Router } from "express";

import userController from "../controllers/userController.js";
import authorizationController from "../controllers/AuthorizationController.js";
import {
    userPublicKeyValidator,
    userStatusValidator,
    updateUserValidator,
    userValidator,
} from "../scripts/userValidator.js";
import { userIsAuthenticatedAndAuthorized } from "../scripts/userAuthorizationVerifier.js";
import userIsAuthenticated from "../scripts/userIsAuthenticated.js";
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

userRouter.delete(
    "/:id",
    userIsAuthenticatedAndAuthorized,
    userController.deleteUser,
);

userRouter.put(
    "/:id/update",
    userIsAuthenticatedAndAuthorized,
    updateUserValidator,
    formValidation,
    userController.updateUser,
);

userRouter.get("/:id/status", /* friends only ,*/ userController.getUserStatus);

userRouter.put(
    "/:id/status",
    userIsAuthenticatedAndAuthorized,
    userStatusValidator,
    formValidation,
    userController.updateUserStatus,
);

userRouter.get("/:id/publicKey", userController.getUserPublicKey);

userRouter.put(
    "/:id/publicKey",
    userIsAuthenticatedAndAuthorized,
    userPublicKeyValidator,
    formValidation,
    userController.updateUserPublicKey,
);

// Friend Feature

userRouter.get(
    "/:id/friendList",
    userIsAuthenticatedAndAuthorized,
    friendController.getUserFriendList,
);

userRouter.put(
    "/:id/friendList/:friendUserId/remove",
    userIsAuthenticatedAndAuthorized,
    friendController.removeUserFriend,
);

// In this case :id is seen as "receiverUserId"
userRouter.get(
    "/:id/friendRequest",
    userIsAuthenticatedAndAuthorized,
    friendController.getUserFriendRequests,
);

// In this case :id is seen as "senderUserId"
userRouter.put(
    "/:id/friendRequest/:receiverUserId/sendRequest",
    userIsAuthenticatedAndAuthorized,
    friendController.sendFriendRequest,
);

// In this case :id is seen as "senderUserId"
userRouter.put(
    "/:id/friendRequest/:receiverUserId/cancelRequest",
    userIsAuthenticatedAndAuthorized,
    friendController.cancelFriendRequest,
);

// In this case :id is seen as "receiverUserId"
userRouter.post(
    "/:id/friendRequest/:senderUserId/decision",
    userIsAuthenticatedAndAuthorized,
    // validate req.body.decision being ["ACCEPT", "REFUSE"]
    formValidation,
    friendController.handleFriendRequest,
);

// Block Feature

userRouter.get(
    "/:id/blockedList",
    userIsAuthenticatedAndAuthorized,
    blockController.getUserBlockedList,
);

userRouter.put("/:id/block", userIsAuthenticated, blockController.blockUser);

userRouter.put(
    "/:id/unblock",
    userIsAuthenticated,
    blockController.unblockUser,
);

// Other

userRouter.get(
    "/:id/chat",
    userIsAuthenticatedAndAuthorized,
    userController.getUserChats,
);

export default userRouter;
