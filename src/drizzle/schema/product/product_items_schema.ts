import { pgTable, text, integer, numeric, timestamp, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { productCategory } from "./product_category_schema";

export const products = pgTable("products", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  name: varchar("name", {length: 255}).notNull(),

  price: integer("price").notNull(),

  distPrice: integer("dist_price").notNull(),

  categoryId: varchar("category_id", {length: 7}).notNull().references(() => productCategory.id, {onDelete: "cascade"}),

  stock: integer("stock").notNull().default(0),

  sold: integer("sold").notNull().default(0),

  createdAt: timestamp("created_at", { mode: "string" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  addedBy: varchar("added_by", {length:255}).notNull(),

  updatedBy: varchar("updated_by", {length:255}).notNull(),
});
