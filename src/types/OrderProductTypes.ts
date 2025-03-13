import { z } from "zod";
import { BaseApiResponse } from "./BaseApi";

export type Order = {
  id: string;
  customerName: string;
  totalPrice: number;
  status: "pending" | "completed" | "processing" | "cancelled";
  createdAt: Date;
};

export type ProductOrder = {
  productId: string;
  productName: string;
  categoryId: string;
  price: number;
  quantity: number;
};

export type OrderRequest = {
  customerName: string;
  totalPrice: number;
  items: ProductOrder[];
};

export type DataOrderResponse = {
  id: string;
  customerName: string;
  totalPrice: number;
  status: string;
};

export type OrderResponse = BaseApiResponse<DataOrderResponse>;

export type OrderDetails = {
  customerName: string;
  orderItems: ProductOrder[];
  notes?: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  subtotal: number;
};

// zod types

export const ProductOrder = z.object({
  productId: z.string().uuid(),
  productName: z.string().min(1),
  categoryId: z.string().min(5),
  price: z.number().default(0),
  quantity: z.number().default(0),
});

export const OrderDetailSchemaZod = z.object({
  customerName: z.string().min(1, "Invalid customer name!"),
  subtotal: z.number().default(0),
  status: z.enum(["pending", "processing", "completed", "cancelled"]),
  notes: z.string().optional(),
});

export const OrderSchemaZod = z.object({
  customerName: z.string().min(1, "Invalid customer name!"),
  subtotal: z.number().default(0),
  status: z.enum(["pending", "processing", "completed", "cancelled"]),
  notes: z.string().optional(),
  orderItems: z.array(ProductOrder),
});
