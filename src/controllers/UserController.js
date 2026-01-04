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
}

export default new UserController();
