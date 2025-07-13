import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

// Reset apenas as tabelas que não usam tipos vector
const seedSchema = {
  rooms: schema.rooms,
  questions: schema.questions,
  // Excluindo audioChunks porque usa tipo vector que não é suportado pelo drizzle-seed
};

await reset(db, seedSchema);

await seed(db, seedSchema).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 20,
    },
  };
});

await sql.end();

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log("Database seeded");
