import prisma from "../db/prisma.js";
import statusHelper from "../scripts/statusHelper.js";

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

    async updateUser(req, res) {
        const { username, public_key, name, surname, description, birth_date } =
            req.body;

        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (user === null) {
            return res.status(404).json(false);
        } else if (
            user.username !== username ||
            user.publicKey !== public_key
        ) {
            // user.publicKey can be null while public_key undefined
            await prisma.user.update({
                where: {
                    id: req.params.id,
                },
                data: {
                    username,
                    publicKey: public_key,
                },
            });
        }

        await prisma.userProfile.upsert({
            where: {
                userId: req.params.id,
            },
            create: {
                userId: req.params.id,
                name,
                surname,
                description,
                birthDate: birth_date,
            },
            update: {
                name,
                surname,
                description,
                birthDate: birth_date,
            },
        });

        return res.status(200).json(true);
    }

    async getUserStatus(req, res) {
        // Limit route to only the user itself and its friends
        // Look out for wrong uuid type Errors

        return res.status(200).json(await statusHelper(req.params.id));
    }

    async updateUserStatus(req, res) {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (user === null) {
            return res.status(404).json(false);
        }

        // (req.body.)status === ONLINE
        // last_seen_online has latest timestamp
        // If 2 minutes have passed then a User is considered
        // to be offline, but the timestamp can still be viewed
        // by friends

        // status === OFFLINE
        // last_seen_online becomes null, it's like a "reset"

        // This allows for the Client to have an option to enable,
        // disable or to stop temporarily the Online Status Updating

        await prisma.userProfile.upsert({
            where: {
                userId: req.params.id,
            },
            create: {
                userId: req.params.id,
                lastSeenOnline:
                    req.body.status === "ONLINE" ? new Date() : null,
            },
            update: {
                lastSeenOnline:
                    req.body.status === "ONLINE" ? new Date() : null,
            },
        });

        return res.status(200).json(true);
    }

    async getUserPublicKey(req, res) {
        return res.status(200).json({
            publicKey:
                (
                    await prisma.user.findUnique({
                        where: {
                            id: req.params.id,
                        },
                        select: {
                            publicKey: true,
                        },
                    })
                )?.publicKey ?? "",
        });
    }

    async updateUserPublicKey(req, res) {
        const { public_key } = req?.body ?? { public_key: null };

        // Checking if a User exists happens frequently...
        // (refactoring needed)
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (user === null) {
            return res.status(404).json(false);
        }

        await prisma.user.update({
            where: {
                id: req.params.id,
            },
            data: {
                publicKey: public_key,
            },
        });

        return res.status(200).json(true);
    }

    // Move in ChatController?
    async getUserChats(req, res) {}
}

export default new UserController();
