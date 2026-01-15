import { Router } from "express";

import chatController from "../controllers/chatController.js";
import userAccessVerifier from "../scripts/userAccessVerifier.js";

const chatRouter = Router();

// Modified userAccessVerifier that only checks if authorized
// And/or if a User has access to a given chat
chatRouter.post("/", userAccessVerifier, chatController.postChat);

chatRouter.get("/:id", userAccessVerifier, chatController.getChat);

chatRouter.delete("/:id", userAccessVerifier, chatController.deleteChat);

chatRouter.get("/:id/member", userAccessVerifier, chatController.getUsers);

chatRouter.post(
    "/:id/member/:userId",
    userAccessVerifier,
    chatController.addUser,
);

chatRouter.get("/:id/message", userAccessVerifier, chatController.getMessages);

chatRouter.post("/:id/message", userAccessVerifier, chatController.postMessage);

chatRouter.delete(
    "/:id/message/:messageId",
    userAccessVerifier,
    chatController.deleteMessage,
);

export default chatRouter;
