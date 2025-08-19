import { PrismaClient } from "@prisma/client";
import envPaths from "env-paths";
import fs from "fs";
import path from "path";

const paths = envPaths("worktracker", { suffix: "" });
// Examples:
// macOS:   ~/Library/Application Support/worktracker
// Linux:   ~/.local/share/worktracker
// Windows: %APPDATA%\worktracker

fs.mkdirSync(paths.data, { recursive: true });
const dbFile = path.join(paths.data, "db.sqlite");
const url = `file:${dbFile}`;

export const prisma = new PrismaClient({
    datasources: { db: { url } },
});

export function getDbUrl() {
    return url;
}
