import process from "process";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({
    adapter,
    omit: {
        user: {
            email: true,
            hashedPassword: true,
        },
        userProfile: {
            lastSeenOnline: true,
        },
    },
});

export const prismaSessionStore = new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
});

export default prisma;
