import prisma from "../db/prisma.js";
import userIsAuthenticated from "./userIsAuthenticated.js";

async function chatAuthorizationVerifier(req, res, next) {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user,
        },
        include: {
            chatsParticipatingIn: true,
        },
    });

    if (user === null) {
        return res.status(404).json(false);
    }

    const isInChat = user.chatsParticipatingIn.some((chatUserObject) => {
        return chatUserObject.chatId === req.params.id;
    });

    if (!isInChat) {
        return res.status(404).json(false);
    }

    return next();
}

const chatIsAuthenticatedAndAuthorized = [
    userIsAuthenticated,
    chatAuthorizationVerifier,
];

export default chatAuthorizationVerifier;
export { chatIsAuthenticatedAndAuthorized };
