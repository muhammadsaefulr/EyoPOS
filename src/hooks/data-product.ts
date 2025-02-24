import { z } from "zod"

export type ProductTypes = {
    id?: string
    name: string
    price: number
    distPrice: number
    categoryName: string
    categoryId: string
    stock: number
    sold: number
    createdAt: string
    updatedAt: string
    addedBy?: string
    updatedBy?: string
  };

export type ProductCatgoryData = {
  id: string
  categoryName: string
}

export type ProductCategoryResp = {
  message: string
  data: ProductCatgoryData[]
}

export type ProductTypeRes = {
  message: string,
  data: ProductTypes[];
}

  // added by dan updatedby tetap dimasukan tapi untuk alasan keamanan addedby tidak boleh dimasukan ke form
  // maupun body dari api
  export type FormDataProductType = {
    name: string
    categoryId: number
    price: number
    distPrice: number
    stock: number
    addedBy?: string
    updatedBy?: string
  }

  export const ProductSchemaZod = z.object({
    name: z.string().min(1, "Product name is required"),
    categoryId: z.string().min(7, "Please Select Category"),
    price: z.number().min(0, "Price must be a positive number"),
    distPrice: z.number().min(0, "Distributor price must be a positive number"),
    stock: z.number().min(0, "Stock must be a positive number"),
    sold: z.number().min(0, "Sold must be a positive number ").optional(),
    addedBy: z.string().optional(),
    updatedBy: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  
  export const CategoryProductSchemaZod = z.object({
    id: z.string().min(7, "Invalid category hex id"),
    categoryName: z.string().min(1, "Invalid Category Name")
  })
  