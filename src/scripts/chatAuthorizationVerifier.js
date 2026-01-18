import prisma from "../db/prisma.js";
import userIsAuthenticated from "./userIsAuthenticated.js";

async function chatAuthorizationVerifier(req, res, next) {
    console.log(req.user);

    const user = await prisma.user.findUnique({
        where: {
            id: req.user,
        },
        include: {
            chatsParticipatingIn: true,
        },
    });

    console.log(user);

    return next();
}

const chatIsAuthenticatedAndAuthorized = [
    userIsAuthenticated,
    chatAuthorizationVerifier,
];

export default chatAuthorizationVerifier;
export { chatIsAuthenticatedAndAuthorized };
