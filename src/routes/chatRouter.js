import { Router } from "express";

import chatController from "../controllers/chatController.js";
import userIsAuthenticated from "../scripts/userIsAuthenticated.js";
import chatAuthorizationVerifier from "../scripts/chatAuthorizationVerifier.js";

const chatRouter = Router();

chatRouter.post("/", userIsAuthenticated, chatController.postChat);

chatRouter.get("/:id", chatAuthorizationVerifier, chatController.getChat);

chatRouter.delete("/:id", chatAuthorizationVerifier, chatController.deleteChat);

chatRouter.get(
    "/:id/member",
    chatAuthorizationVerifier,
    chatController.getUsers,
);

chatRouter.post(
    "/:id/member/:userId",
    chatAuthorizationVerifier,
    chatController.addUser,
);

chatRouter.get(
    "/:id/message",
    chatAuthorizationVerifier,
    chatController.getMessages,
);

chatRouter.post(
    "/:id/message",
    chatAuthorizationVerifier,
    chatController.postMessage,
);

chatRouter.get(
    "/:id/message/:messageId",
    chatAuthorizationVerifier,
    chatController.deleteMessage,
);

chatRouter.delete(
    "/:id/message/:messageId",
    chatAuthorizationVerifier,
    chatController.deleteMessage,
);

export default chatRouter;
