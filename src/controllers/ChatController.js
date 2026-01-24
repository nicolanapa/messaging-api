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
            null,
            null,
        );

        return res.status(200).json({ messagesImages: allMessagesImages });
    }

    async postMessage(req, res) {}

    async deleteMessage(req, res) {}
}

export default new chatController();
