import { Router } from "express";

import chatController from "../controllers/chatController.js";
import userAuthorizationVerifier from "../scripts/userAuthorizationVerifier.js";
import userIsAuthenticated from "../scripts/userIsAuthenticated.js";

const chatRouter = Router();

chatRouter.post("/", userIsAuthenticated, chatController.postChat);

chatRouter.get("/:id", userAuthorizationVerifier, chatController.getChat);

chatRouter.delete("/:id", userAuthorizationVerifier, chatController.deleteChat);

chatRouter.get(
    "/:id/member",
    userAuthorizationVerifier,
    chatController.getUsers,
);

chatRouter.post(
    "/:id/member/:userId",
    userAuthorizationVerifier,
    chatController.addUser,
);

chatRouter.get(
    "/:id/message",
    userAuthorizationVerifier,
    chatController.getMessages,
);

chatRouter.post(
    "/:id/message",
    userAuthorizationVerifier,
    chatController.postMessage,
);

chatRouter.delete(
    "/:id/message/:messageId",
    userAuthorizationVerifier,
    chatController.deleteMessage,
);

export default chatRouter;
