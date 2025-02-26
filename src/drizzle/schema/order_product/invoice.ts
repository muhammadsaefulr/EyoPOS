import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { orders } from "./order";
import { generateInvoiceNumber } from "@/lib/utils";

export const invoices = pgTable("invoices", {
    id: varchar("id").primaryKey().$defaultFn(() => generateInvoiceNumber()),
    orderId: varchar("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    invoiceNumber: varchar("invoice_number", { length: 50 }).notNull().unique(),
    totalAmount: integer("total_amount").notNull(),
    issuedAt: timestamp("issued_at").notNull().defaultNow(),
    dueDate: timestamp("due_date").notNull(),
    status: varchar("status", { length: 50 }).notNull().default("unpaid")
  });