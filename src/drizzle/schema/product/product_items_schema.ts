import { pgTable, text, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const products = pgTable("products", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  name: text("name").notNull(),

  price: numeric("price").notNull(),

  distPrice: numeric("dist_price").notNull(),

  category: text("category").notNull(),

  stock: integer("stock").notNull().default(0),

  sold: integer("sold").notNull().default(0),

  createdAt: timestamp("created_at", { mode: "string" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  addedBy: text("added_by").notNull(),

  updatedBy: text("updated_by").notNull(),
});
