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

    async deleteUser(req, res) {
        // Deletion process to be improved (and tested) when chats are working

        /*const userChats = await prisma.chatParticipation.findMany({
            where: {
                userId: req.params.id,
            },
        });

        if (userChats !== null) {
            for (let i = 0; i < userChats.length; i++) {
                // Search every single chats for the mentioned checks
            }
        }*/

        await prisma.user.delete({
            where: {
                id: req.params.id,
            },
            include: {
                userProfile: true,
                userBlocker: true,
                blockedFromUsers: true,
                chatsParticipatingIn: true,
                chatsDeleted: true,
                messages: false,
                images: false,
            },
        });

        // All messages are kept, the User's username will be 'Deleted User' or similar
        // A single chat between another User will have a single participator
        // They can send messages (?) or delete it permanently
        // Group chats will have one less participator, if there's already
        // one person then it will be deleted
        // I'll have to implement other special cases and checks
        // Otherwise If I do it now then it's like going blind in it

        return res.status(200).json(true);
    }

    async updateUser(req, res) {}

    async getUserStatus(req, res) {}

    async updateUserStatus(req, res) {}

    async getUserPublicKey(req, res) {}

    async updateUserPublicKey(req, res) {}

    // Some other methods

    async getUserChats(req, res) {}
}

export default new UserController();
