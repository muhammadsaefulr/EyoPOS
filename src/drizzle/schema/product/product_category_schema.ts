    import { pgTable, varchar } from "drizzle-orm/pg-core";

    export const productCategory = pgTable("product_category", {
        id: varchar("id", { length: 7 }).primaryKey(),
        categoryName: varchar("category_name", {length: 100}).notNull()
    })