import postgres from "postgres";
import { env } from "../env.ts";

import { drizzle } from "drizzle-orm/postgres-js";
import { rooms } from "./schema/rooms.ts";

export const sql = postgres(env.DATABASE_URL);
export const db = drizzle(sql, {
  schema: {
    rooms,
    casing: "snake_case", // Use snake_case for table and column names
  },
});
