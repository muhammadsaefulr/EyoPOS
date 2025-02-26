import { pgTable, text, varchar, integer, timestamp, serial } from "drizzle-orm/pg-core";
import { products } from "../product/product_items_schema";
import { productCategory } from "../product/product_category_schema";
import { generateOrderNumber } from "@/lib/utils";
import { users } from "../user";

export const orders = pgTable("orders", {
    id: varchar("id").primaryKey().$defaultFn(() => generateOrderNumber()),
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    totalPrice: integer("total_price").notNull(),
    status: varchar("status", { length: 50 }).notNull().default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow()
  });

  export const orderItems = pgTable("order_items", {
    id: serial("id").primaryKey(),
    orderId: varchar("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    categoryId: varchar("category_id", { length: 7 }).notNull().references(() => productCategory.id, { onDelete: "cascade" }),
    pricePerItem: integer("price_per_item").notNull(),
    quantity: integer("quantity").notNull(),
    totalPrice: integer("total_price").notNull()
  });

  export const orderHistory = pgTable("order_history", {
    id: serial("id").primaryKey(),
    orderId: varchar("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    status: varchar("status", { length: 50 }).notNull(),
    changedAt: timestamp("changed_at").notNull().defaultNow(),
    updatedBy: varchar("updated_by").notNull().references(() => users.id, { onDelete: "cascade" })
  });

  