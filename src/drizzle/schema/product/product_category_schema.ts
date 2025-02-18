import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const productCategory = pgTable("product_category", {
    id: serial("id").primaryKey(),
    categoryName: varchar("category_name", {length: 100}).notNull()
})