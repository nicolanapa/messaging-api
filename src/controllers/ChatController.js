import prisma from "../db/prisma.js";
import messageImageUnion from "../scripts/messageImageUnion.js";

class chatController {
    async postChat(req, res) {}

    async getChat(req, res) {
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
            },
            include: {
                chatParticipations: true,
                chatDeletions: true,
            },
        });

        return res.status(200).json(chat);
    }

    async deleteChat(req, res) {
        const chatParticipations = await prisma.chatParticipation.findMany({
            where: {
                chatId: req.params.id,
            },
        });

        const chatDeletions = await prisma.chatDeletion.findMany({
            where: {
                chatId: req.params.id,
            },
        });

        const isParticipant = chatParticipations.some(
            (participation) => participation.userId === req.user,
        );

        const hasDeletedChat = chatDeletions.some(
            (deletion) => deletion.userId === req.user,
        );

        /*console.log(
            chatParticipations,
            chatDeletions,
            isParticipant,
            hasDeletedChat,
        );*/

        if (isParticipant && !hasDeletedChat) {
            await prisma.chatDeletion.create({
                data: {
                    chatId: req.params.id,
                    userId: req.user,
                },
            });
        }

        /*console.log(
            chatParticipations.length,
            chatDeletions.length + (!hasDeletedChat ? 1 : 0),
        );*/

        // It works if there aren't duplicated records
        if (
            chatParticipations.length !==
            chatDeletions.length + (!hasDeletedChat ? 1 : 0)
        ) {
            return res.status(202).json(false);
        }

        await prisma.chat.delete({
            where: {
                id: req.params.id,
            },
        });

        return res.status(200).json(true);
    }

    async getUsers(req, res) {
        const chatParticipations = await prisma.chatParticipation.findMany({
            where: {
                chatId: req.params.id,
            },
        });

        let participationsArray = Array(chatParticipations.length);

        for (let i = 0; i < chatParticipations.length; i++) {
            participationsArray[i] = chatParticipations[i].userId;
        }

        return res
            .status(200)
            .json({ chatParticipations: participationsArray });
    }

    async addUser(req, res) {}

    async getMessages(req, res) {
        const allMessagesImages = await messageImageUnion(
            prisma,
            req.params.id,
            parseInt(req.body?.limit) ? parseInt(req.body?.limit) : 0,
            parseInt(req.body?.offset) ? parseInt(req.body?.offset) : 0,
        );

        return res.status(200).json({ messagesImages: allMessagesImages });
    }

    async postMessage(req, res) {}

    async getMessage(req, res) {
        const message = await prisma.message.findUnique({
            where: { id: req.params.messageId },
        });

        return res.status(200).json({ message });
    }

    async deleteMessage(req, res) {
        // Keep DELETE /chat/:id/message/:messageId
        // but delete DELETE /chat/:id/image/:imageId
        // and use instead a TYPE enum in the body?

        const message = await prisma.message.findUnique({
            where: { id: req.params.messageId },
        });

        if (message === null) {
            return res.status(404).json(false);
        }

        if (message.userId === req.user && message.chatId === req.params.id) {
            await prisma.message.delete({
                where: {
                    id: req.params.messageId,
                },
            });

            return res.status(200).json(true);
        }

        return res.status(403).json(false);
    }

    async getImage(req, res) {
        // Make it download the given Image
        const image = await prisma.image.findUnique({
            where: { id: req.params.imageId },
        });

        return res.status(200).json({ image });
    }

    async deleteImage(req, res) {
        const image = await prisma.message.findUnique({
            where: { id: req.params.imageId },
        });

        if (image === null) {
            return res.status(404).json(false);
        }

        if (image.userId === req.user && image.chatId === req.params.id) {
            await prisma.message.delete({
                where: {
                    id: req.params.imageId,
                },
            });

            return res.status(200).json(true);
        }

        return res.status(403).json(false);
    }
}

export default new chatController();
