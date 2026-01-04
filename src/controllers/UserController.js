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
}

export default new UserController();
