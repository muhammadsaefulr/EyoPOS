import { z } from "zod"
import { ProductTypes } from "./ProductTypes"

export type ProductOrder = {
    productId: string,
    categoryId: string,
    price: number,
    quantity: number,
}

export type OrderRequest = {
    customerName: string,
    totalPrice: number,
    items: ProductOrder[]
}

export type DataOrderResponse = {
    id: string
    customerName: string
    totalPrice: number,
    status: string
}

export type OrderResponse = {
    message: string,
    data: DataOrderResponse
}

// zod types

export const ProductOrder = z.object({
    productId: z.string().uuid(),
    categoryId: z.string().min(5),
    price: z.number().default(0),
    quantity: z.number().default(0)
})

export const OrderSchemaZod = z.object({
    customerName: z.string().min(1, "Invalid customer name!"),
    subtotal: z.number().default(0),
    notes: z.string().optional(),
    orderItems: z.array(ProductOrder)
})
  
  export type OrderDetails =  {
    customerName: string
    orderItems: ProductOrder[]
    notes?: string
    status: "pending" | "processing" | "completed"
    subtotal: number
  }
  