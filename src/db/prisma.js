import process from "process";
import { PrismaPg } from "@prisma/adapter-pg";
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
            status: true,
        },
    },
});

export default prisma;
