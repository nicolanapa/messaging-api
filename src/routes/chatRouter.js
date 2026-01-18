import { Router } from "express";

import chatController from "../controllers/chatController.js";
import userIsAuthenticated from "../scripts/userIsAuthenticated.js";
import { chatIsAuthenticatedAndAuthorized } from "../scripts/chatAuthorizationVerifier.js";

const chatRouter = Router();

chatRouter.post("/", userIsAuthenticated, chatController.postChat);

chatRouter.get(
    "/:id",
    chatIsAuthenticatedAndAuthorized,
    chatController.getChat,
);

chatRouter.delete(
    "/:id",
    chatIsAuthenticatedAndAuthorized,
    chatController.deleteChat,
);

chatRouter.get(
    "/:id/member",
    chatIsAuthenticatedAndAuthorized,
    chatController.getUsers,
);

chatRouter.post(
    "/:id/member/:userId",
    chatIsAuthenticatedAndAuthorized,
    chatController.addUser,
);

chatRouter.get(
    "/:id/message",
    chatIsAuthenticatedAndAuthorized,
    chatController.getMessages,
);

chatRouter.post(
    "/:id/message",
    chatIsAuthenticatedAndAuthorized,
    chatController.postMessage,
);

chatRouter.get(
    "/:id/message/:messageId",
    chatIsAuthenticatedAndAuthorized,
    chatController.deleteMessage,
);

chatRouter.delete(
    "/:id/message/:messageId",
    chatIsAuthenticatedAndAuthorized,
    chatController.deleteMessage,
);

export default chatRouter;
