import { z } from "zod"

export type ProductTypes = {
    id?: string
    name: string
    price: number
    distPrice: number
    categoryId: number
    stock: number
    sold: number
    createdAt: string
    addedBy?: string
    updatedBy?: string
  }


  // added by dan updatedby tetap dimasukan tapi untuk alasan keamanan addedby tidak boleh dimasukan ke form
  // maupun body dari api
  export type FormDataProductType = {
    name: string
    category: string
    price: number
    distPrice: number
    stock: number
    addedBy?: string
    updatedBy?: string
  }

  export const ProductSchemaZod = z.object({
    name: z.string().min(1, "Product name is required"),
    categoryId: z.number(),
    price: z.number().min(0, "Price must be a positive number"),
    distPrice: z.number().min(0, "Distributor price must be a positive number"),
    stock: z.number().min(0, "Stock must be a positive number"),
    addedBy: z.string().optional(),
    updatedBy: z.string().optional(),
  })
  
  export const productsInit: ProductTypes[] = [
    {
      id: "PROD-1234",
      name: "Wireless Earbuds Pro",
      price: 62000,
      distPrice: 50000,
      categoryId: 1,
      // status: "in_stock",
      stock: 20,
      sold: 6,
      createdAt: "2024-01-15",
    },
    {
      id: "PROD-1235",
      name: "Charger Robot T20",
      price: 90000,
      distPrice: 82000,
      categoryId: 1,
      // status: "low_stock",
      stock: 45,
      sold: 6,
      createdAt: "2024-01-15",
    },
  ]
  
  