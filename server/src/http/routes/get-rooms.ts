import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { eq, count } from "drizzle-orm";

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get("/rooms", async () => {
    const results = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        questionsCount: count(schema.questions.id),
        createdAt: schema.rooms.created_at,
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.questions.room_id, schema.rooms.id))
      .groupBy(schema.rooms.id)
      .orderBy(schema.rooms.created_at);
    return results;
  });
};
