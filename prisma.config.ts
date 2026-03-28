import "dotenv/config";
import { defineConfig } from "prisma/config";

const isMigrateCommand = process.argv.includes("migrate");
const databaseUrl = isMigrateCommand
    ? process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"]
    : process.env["DATABASE_URL"];

if (!databaseUrl) {
    throw new Error("Missing DATABASE_URL in environment variables.");
}

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
        seed: "npx ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts",
    },
    datasource: {
        url: databaseUrl,
    },
});
