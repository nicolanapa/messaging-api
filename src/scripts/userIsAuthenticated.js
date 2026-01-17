async function userIsAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json(false);
    }

    return next();
}

export default userIsAuthenticated;
