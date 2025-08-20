import { PrismaClient } from "@prisma/client";

process.env.DATABASE_URL;

export const prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
});
