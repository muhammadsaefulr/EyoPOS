import { z } from "zod"

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

export type OrderResponse = {
    message: string,
    order_id: string,
    total_price: number,
    status: string
}

// zod types

export const ProductOrder = z.object({
    productId: z.string().min(5),
    categoryId: z.string().min(5),
    price: z.number().default(0),
    quantity: z.number().default(0)
})

export const OrderSchemaZod = z.object({
    customerName: z.string().min(1, "Invalid customer name!"),
    totalPrice: z.number().default(0),
    items: z.array(ProductOrder)
})

export type Order = {
    id: string
    customer: string
    date: Date
    status: "pending" | "processing" | "completed" | "cancelled"
    total: number
    items: number
  }
  
  export type OrderItem = {
    id: string
    productName: string
    quantity: number
    price: number
    total: number
  }
  
  export type OrderDetails = Order & {
    orderItems: OrderItem[]
    notes?: string
    paymentMethod: string
    tax: number
    subtotal: number
  }
  