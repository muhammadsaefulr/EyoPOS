import { z } from "zod";
import { BaseApiResponse } from "./BaseApi";

export type ProductTypes = {
  id?: string;
  name: string;
  price: number;
  distPrice: number;
  categoryName: string;
  categoryId: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  addedBy?: string;
  updatedBy?: string;
};

export type ProductCatgoryData = {
  id: string;
  categoryName: string;
};

// Type Res API
export type ProductCategoryResp = BaseApiResponse<ProductCatgoryData[]>;

export type ProductTypeRes = BaseApiResponse<ProductTypes[]>;

// Form And Zod Scheme

// added by dan updatedby tetap dimasukan tapi untuk alasan keamanan addedby tidak boleh dimasukan ke form
// maupun body dari api
export type FormDataProductType = {
  name: string;
  categoryId: number;
  price: number;
  distPrice: number;
  stock: number;
  addedBy?: string;
  updatedBy?: string;
};

export const ProductSchemaZod = z.object({
  name: z.string().min(1, "Product name is required"),
  categoryId: z.string().min(7, "Please Select Category"),
  price: z.number().min(0, "Price must be a positive number"),
  distPrice: z.number().min(0, "Distributor price must be a positive number"),
  stock: z.number().min(0, "Stock must be a positive number"),
  addedBy: z.string().optional(),
  updatedBy: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const RestockSchema = z.object({
  productId: z.string().min(25, "Must Valid Product Id"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  pricePerUnit: z.number().min(1, "Price per unit must be at least 1"),
  totalCost: z.number().min(1, "Total cost must be calculated"),
  restockedBy: z.string().min(2, "Must Filled"),
  restockedByUserId: z.string().min(2, "Must Filled"),
});

export type RestockTypes = {
  productId: string;
  quantity: number;
  pricePerUnit: number;
  totalCost: number;
  restockedBy: string;
};

export const CategoryProductSchemaZod = z.object({
  id: z.string().min(7, "Invalid category hex id"),
  categoryName: z.string().min(1, "Invalid Category Name"),
});
