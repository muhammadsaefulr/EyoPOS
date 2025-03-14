import {
  ProductCategoryResp,
  ProductCatgoryData,
  ProductSchemaZod,
  ProductTypeRes,
  RestockTypes,
} from "@/types/ProductTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
import { OrderDetails, OrderResponse, Order } from "@/types/OrderProductTypes";
import { OrderInvoice, OrderInvoiceResponse } from "@/types/InvoiceTypes";
import { PdfConvertRequest } from "@/types/PdfConvertTypes";

export type ProductType = z.infer<typeof ProductSchemaZod>;

type BaseApiRequest = {currentPage?: number | 1, sortBy?: string | "id", sortOrder?: string | "asc", date?: string | "monthly"}

export function usePdfConverter(){
  return useMutation({
    mutationFn: async (data: PdfConvertRequest) => {
      try {
        const res = await axios.post(`/api/docs/pdf`, data);

        if (res.status !== 200) {
          throw new Error("Failed to convert pdf");
        }

        return res.data;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },
  });
}

export function useGetAllCategoryProductQuery() {
  return useQuery<ProductCategoryResp>({
    queryKey: ["getAllCategoryProduct"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/product/category`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },
  });
}

export function useAddCategoryProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: ProductCatgoryData) => {
      try {
        const res = await axios.post(`/api/product/category`, category);
        if (res.status !== 200) {
          throw new Error("Failed to add category product");
        }

        return res.data;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCategoryProduct"] });
    },
  });
}

export function useUpdateCategoryProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      paramId,
      category,
    }: {
      paramId: string;
      category: ProductCatgoryData;
    }) => {
      try {
        const res = await axios.put(
          `/api/product/category/${paramId}`,
          category,
        );

        if (res.status !== 200) {
          throw new Error("Failed to update category product");
        }

        return res.data;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCategoryProduct"] });
    },
  });
}

export function useDeleteCategoryProductByIdMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paramId: string) => {
      const res = await axios.delete(`/api/product/category/${paramId}`);

      if (res.status != 200) {
        throw new Error("Failed to delete category product");
      }

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCategoryProduct"] });
    },
  });
}

export function useGetAllProductQuery(param: BaseApiRequest) {
  return useQuery<ProductTypeRes>({
    queryKey: ["getAllProduct", param.currentPage],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/product?page=${param.currentPage}&sortBy=${param.sortBy}&sortOrder=${param.sortOrder}`);
        if (!res.ok) throw new Error("Failed to fetch all products");
        return res.json();
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },
  });
}

export function useAddProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: ProductType) => {
      try {
        const res = await axios.post(`/api/product`, newProduct);

        if (res.status !== 200) {
          throw new Error("Failed to add product");
        }

        return res.data;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
    },
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      paramId,
      product,
    }: {
      paramId: string;
      product: ProductType;
    }) => {
      try {
        const res = await axios.put(`/api/product/${paramId}`, product);

        if (res.status !== 200) {
          throw new Error("Failed to update product");
        }

        return res.data;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
    },
  });
}

export function useDeleteProductByIdMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      try {
        const res = await axios.delete(`/api/product/${productId}`);
        if (res.status !== 200) {
          throw new Error("Failed to delete product");
        }
        return res.data;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useRestockProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (restockScheme: RestockTypes) => {
      try {
        const res = await axios.post(`/api/product/restock`, restockScheme);

        if (res.status !== 200) {
          throw new Error("Failed to restock product");
        }
        return res.data;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useAddOrderMutation() {
  return useMutation({
    mutationFn: async (order: OrderDetails): Promise<OrderResponse> => {
      try {
        const res = await axios.post(`/api/order`, order);

        if (res.status != 200) {
          throw new Error("Failed to create order");
        }

        return res.data;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useGetAllOrderQuery(param: BaseApiRequest & {product?: boolean | false}) {
  return useQuery({
    queryKey: ["allOrderQuery"],
    queryFn: async (): Promise<OrderResponse> => {
      try {
        const res = await axios.get(`/api/order?page=${param.currentPage}&sortBy=${param.sortBy}&sortOrder=${param.sortOrder}&product=${param.product}&date=${param.date}`);

        if (res.status != 200) {
          throw new Error("Failed to fetch all orders");
        }
        return res.data;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },
  });
}

export function useGetAllOrderMutation() {
  return useMutation({
    mutationFn: async (detailProduct: boolean) => {
      try {
        const res = await axios.get(`/api/order?product=${detailProduct}`);

        if (res.status != 200) {
          throw new Error("Failed to fetch all orders");
        }

        return res.data;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useUpdateOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: Order) => {
      try {
        const response = await axios.put(`/api/order/${order.id}`, order);
        return response.data;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allOrderQuery"] });
    },
  });
}

export function useAddInvoiceMutation() {
  return useMutation({
    mutationFn: async (invoice: OrderInvoice) => {
      try {
        const res = await axios.post(`/api/invoice`, invoice);

        if (res.status != 200) {
          throw new Error("Failed to create invoice");
        }

        return res.data;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useGetInvoiceByIdQuery(invoiceId: string) {
  return useQuery<OrderInvoiceResponse>({
    queryKey: ["invoiceKey"],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/invoice/${invoiceId}`);
        
        if (res.status !== 200) {
          throw new Error("Failed to fetch invoice");
        }

        console.log(res.data.data)

        return res.data
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : "Unknown error",
          );
        }
    },
  });
}
