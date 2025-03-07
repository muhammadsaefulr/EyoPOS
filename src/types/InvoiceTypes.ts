import { z } from "zod";
import { OrderDetails, ProductOrder } from "./OrderProductTypes";

export type OrderInvoice = {
  id?: string;
  orderId: string;
  totalAmount: number;
  issuedAt: string;
  dueDate: string;
  status: "paid" | "unpaid";
};

type InvoiceProductItem = {
  id: number;
  orderId: string;
  productName: string;
  productId: string;
  categoryId: string;
  pricePerItem: number;
  quantity: number;
  totalPrice: number;
};

export type OrderInvoiceResponse = {
  orderInvoice: OrderInvoice
  orderInfo: OrderDetails[]
  orderItem: InvoiceProductItem[]
};

export const OrderInvoiceSchemaZod = z.object({
  orderId: z.string(),
  totalAmount: z.number(),
  issuedAt: z.string(),
  dueDate: z.string(),
  status: z.enum(["paid", "unpaid"]),
})