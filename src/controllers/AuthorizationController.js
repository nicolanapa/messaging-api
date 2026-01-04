class AuthorizationController {
    async login(req, res) {
        return res.status(204).send();
    }

    async signUp(req, res) {
        // TODO
    }
}

export default new AuthorizationController();
