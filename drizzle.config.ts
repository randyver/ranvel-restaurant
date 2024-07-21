import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";
import dotenv from 'dotenv';

const projectDir = process.cwd();
loadEnvConfig(projectDir);
dotenv.config({ path: `${projectDir}/.env.development.local` });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
    ssl: true,
  },
});
