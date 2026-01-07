import prisma from "../db/prisma.js";

class UserController {
    async getUsers(req, res) {
        const users = await prisma.user.findMany({
            include: {
                userProfile: true,
            },
        });

        return res.json(users);
    }

    async getUser(req, res) {
        const users = await prisma.user.findUnique({
            include: {
                userProfile: true,
            },
            where: {
                id: req.params.id,
            },
        });

        return res.json(users);
    }

    async deleteUser(req, res) {}

    async updateUser(req, res) {}

    async getUserStatus(req, res) {}

    async updateUserStatus(req, res) {}

    async getUserPublicKey(req, res) {}

    async updateUserPublicKey(req, res) {}

    // Some other methods

    async getUserChats(req, res) {}
}

export default new UserController();
