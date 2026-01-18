import userIsAuthenticated from "./userIsAuthenticated.js";

async function userAuthorizationVerifier(req, res, next) {
    if (req.params.id !== req.user) {
        return res.status(403).json(false);
    }

    return next();
}

const userIsAuthenticatedAndAuthorized = [
    userIsAuthenticated,
    userAuthorizationVerifier,
];

export default userAuthorizationVerifier;
export { userIsAuthenticatedAndAuthorized };
