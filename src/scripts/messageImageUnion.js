async function messageImageUnion(prisma, chatId, limit = null, offset = null) {
    const messages = await prisma.message.findMany({
        where: {
            chatId: chatId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    const images = await prisma.image.findMany({
        where: {
            chatId: chatId,
        },
        orderBy: {
            uploadedAt: "asc",
        },
    });

    console.log(messages, "\n\n", images);

    let arrayOfMessagesAndImages = Array(messages.length + images.length);

    if (arrayOfMessagesAndImages.length === 0) {
        return [];
    }

    if (messages.length !== 0 && images.length === 0) {
        return messages;
    }

    if (images.length !== 0 && messages.length === 0) {
        return images;
    }

    let timestamp = null;

    if (messages[0].createdAt <= images[0].uploadedAt) {
        timestamp = messages[0].createdAt;
    } else {
        timestamp = images[0].uploadedAt;
    }

    let latestIndex2 = 0;
    for (let i = 0; i < messages.length; i++) {
        console.log(timestamp);

        // Side tested: more messages than images
        // Have to test: more images than messages
        for (let i2 = latestIndex2; i2 < images.length; i2++) {
            if (latestIndex2 === null) {
                timestamp = messages[i].createdAt;

                arrayOfMessagesAndImages[i + images.length] = messages[i];

                console.log("message");

                break;
            }

            console.log(
                latestIndex2,
                messages[i].createdAt,
                images[i2].uploadedAt,
                messages[i].createdAt <= images[i2].uploadedAt,
            );

            if (messages[i].createdAt <= images[i2].uploadedAt) {
                timestamp = messages[i].createdAt;

                arrayOfMessagesAndImages[i + i2] = messages[i];

                console.log("message");
            } else {
                timestamp = images[i2].uploadedAt;

                arrayOfMessagesAndImages[i + i2] = images[i2];

                console.log("image");

                i--;

                if (i2 + 1 < images.length) {
                    latestIndex2++;
                } else {
                    latestIndex2 = null;
                }
            }

            break;
        }
    }

    return arrayOfMessagesAndImages;
}

export default messageImageUnion;
