async function messageImageUnion(prisma, chatId, limit = 0, offset = 0) {
    // console.log(limit, offset);

    const messages = await prisma.message.findMany({
        where: {
            chatId: chatId,
        },
        orderBy: {
            createdAt: "asc",
        },
        take: limit === 0 ? 4096 : limit,
        skip: offset,
    });

    const images = await prisma.image.findMany({
        where: {
            chatId: chatId,
        },
        orderBy: {
            uploadedAt: "asc",
        },
        take: limit === 0 ? 4096 : limit,
        skip: offset,
    });

    // console.log("MESSAGES:", messages, "\n\nIMAGES:", images);

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

    // Timestamp is useless after all
    // let timestamp = null;

    // Sorting double for loop that "prioritize" messages
    // Should be O(n) since I'm not making it fully loop every time
    let latestIndex2 = 0;
    for (let i = 0; i < messages.length; i++) {
        // console.log(timestamp);

        if (i === -1) {
            break;
        }

        for (let i2 = latestIndex2; i2 < images.length; i2++) {
            if (i === -2) {
                // timestamp = images[i2].uploadedAt;

                arrayOfMessagesAndImages[messages.length + i2] = images[i2];

                continue;
            }

            if (latestIndex2 === -2) {
                // timestamp = messages[i].createdAt;

                arrayOfMessagesAndImages[i + images.length] = messages[i];

                break;
            }

            /*console.log(
                latestIndex2,
                messages[i].createdAt,
                images[i2].uploadedAt,
                messages[i].createdAt <= images[i2].uploadedAt,
            );*/

            if (messages[i].createdAt <= images[i2].uploadedAt) {
                // timestamp = messages[i].createdAt;

                arrayOfMessagesAndImages[i + i2] = messages[i];

                if (i + 1 >= messages.length) {
                    i = -2;
                    i2--;

                    continue;
                }
            } else {
                // timestamp = images[i2].uploadedAt;

                arrayOfMessagesAndImages[i + i2] = images[i2];

                i--;

                if (i2 + 1 < images.length) {
                    latestIndex2++;
                } else {
                    latestIndex2 = -2;
                }
            }

            break;
        }
    }

    return arrayOfMessagesAndImages;
}

export default messageImageUnion;
