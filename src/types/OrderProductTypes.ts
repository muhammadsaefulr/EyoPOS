import { z } from "zod";
import { BaseApiResponse } from "./BaseApiTypes";

export type Order = {
  id: string;
  customerName: string;
  totalPrice: number;
  status: string | "pending" | "completed" | "processing" | "cancelled";
  createdAt: Date | string;
};

export type ProductOrder = {
  id?: number;
  productId: string;
  categoryId?: string;
  productName: string;
  quantity: number;
  pricePerItem: number;
  totalPrice?: number;
  createdAt?: string;
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
  createdAt: string;
  status: string;
  items?: ProductOrder[]
};

export type AddOrderResponse = BaseApiResponse<DataOrderResponse>
export type OrderResponse = BaseApiResponse<DataOrderResponse[]>;

export type OrderDetails = {
  id?: string
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
  pricePerItem: z.number().default(0),
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
