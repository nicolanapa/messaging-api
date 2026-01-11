import prisma from "../db/prisma.js";

async function statusHelper(userId) {
    let userStatus = {
        lastSeenOnline:
            (
                await prisma.userProfile.findUnique({
                    where: {
                        userId: userId,
                    },
                    select: {
                        lastSeenOnline: true,
                    },
                })
            )?.lastSeenOnline ?? null,
        status: null,
    };

    if (userStatus.lastSeenOnline !== null) {
        const currentDate = new Date().valueOf();
        const lastSeenOnlineDate = new Date(
            userStatus.lastSeenOnline,
        ).valueOf();

        const minutesPassed = currentDate / 60000 - lastSeenOnlineDate / 60000;

        if (minutesPassed < 2) {
            userStatus.status = "ONLINE";
        } else {
            const daysPassed =
                currentDate / 86400000 - lastSeenOnlineDate / 86400000;

            if (daysPassed > 7) {
                userStatus.lastSeenOnline = null;
            }

            userStatus.status = "OFFLINE";
        }
    } else if (userStatus.lastSeenOnline === null) {
        userStatus.status = "OFFLINE";
    }

    return userStatus;
}

export default statusHelper;
