import { pgTable, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { orders } from "./order";
import { generateInvoiceNumber } from "@/lib/utils";

export const invoices = pgTable("invoices", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => generateInvoiceNumber()),
  orderId: varchar("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  totalAmount: integer("total_amount").notNull(),
  issuedAt: timestamp("issued_at").notNull().defaultNow(),
  dueDate: timestamp("due_date").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("unpaid"),
});
