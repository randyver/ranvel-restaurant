import * as schema from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.POSTGRES_URL!);
export const db = drizzle(sql, { schema });
