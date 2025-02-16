import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable('user', {
  id: text("id")
  .primaryKey()
  .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})
