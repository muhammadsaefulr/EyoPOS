import { pgTable, integer, timestamp, serial, varchar } from "drizzle-orm/pg-core";
import { products } from "./product_items_schema";
import { users } from "../user"
import { sql } from "drizzle-orm";

export const restocks = pgTable("restocks", {
    id: serial("id").primaryKey(),
    productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    pricePerUnit: integer("price_per_unit").notNull(),
    totalCost: integer("total_cost").notNull(),
    restockedAt: timestamp("restocked_at", { mode: "string" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    restockedBy: varchar("restocked_by").notNull().references(() => users.id, { onDelete: "cascade" }),
  });