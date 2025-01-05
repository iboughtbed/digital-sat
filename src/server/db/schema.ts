import { sql } from "drizzle-orm";
import { json, pgTableCreator, serial, timestamp } from "drizzle-orm/pg-core";

import type { Test } from "~/types";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `digital-sat_${name}`);

export const tests = createTable("test", {
  id: serial("id").primaryKey(),
  test: json("test").$type<Test>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});
