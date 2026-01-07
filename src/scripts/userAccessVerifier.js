async function userAccessVerifier(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json(false);
    }

    if (req.params.id !== req.user) {
        return res.status(403).json(false);
    }

    return next();
}

export default userAccessVerifier;
