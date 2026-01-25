import { Router } from "express";

import chatController from "../controllers/chatController.js";
import userIsAuthenticated from "../scripts/userIsAuthenticated.js";
import { chatIsAuthenticatedAndAuthorized } from "../scripts/chatAuthorizationVerifier.js";
import { limitOffset } from "../scripts/chatValidator.js";
import formValidation from "../scripts/formValidation.js";

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
    limitOffset,
    formValidation,
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
    chatController.getMessage,
);

chatRouter.delete(
    "/:id/message/:messageId",
    chatIsAuthenticatedAndAuthorized,
    chatController.deleteMessage,
);

chatRouter.get(
    "/:id/image/:imageId",
    chatIsAuthenticatedAndAuthorized,
    chatController.getImage,
);

chatRouter.delete(
    "/:id/image/:imageId",
    chatIsAuthenticatedAndAuthorized,
    chatController.deleteImage,
);

export default chatRouter;
