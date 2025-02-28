import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const registredUser = pgTable('registred_user', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    email: varchar({length: 255}).notNull().unique(),
    registredAt: timestamp("registred_at", {mode:"date"}).default(sql`CURRENT_TIMESTAMP`),
})