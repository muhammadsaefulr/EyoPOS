import { ProductCategoryResp, ProductSchemaZod, ProductTypeRes, ProductTypes } from "@/hooks/data-product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";

export type ProductType = z.infer<typeof ProductSchemaZod>;

export function useGetAllCategoryProductQuery() {
  return useQuery<ProductCategoryResp>({
    queryKey: ["getAllCategoryProduct"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/product/category`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
      }
    },
  });
}

export function useGetAllProductQuery() {
  return useQuery<ProductTypeRes>({
    queryKey: ["getAllProduct"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/product`);
        if (!res.ok) throw new Error("Failed to fetch all products");
        return res.json();
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
      }
    },
  });
}

export function useAddProductMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newProduct: ProductType) => {
      try {
        const res = await axios.post('/api/product', newProduct);

        if (res.status !== 200) {
          throw new Error("Failed to add product");
        }

        return res.data;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
    },
  });
}

export function useUpdateProductMutation() {
  return useMutation({
    mutationFn: async (updatedProduct: ProductTypes) => {
      try {
        const res = await axios.put(`/api/product/${updatedProduct.id}`, updatedProduct);

        if (res.status !== 200) {
          throw new Error("Failed to update product");
        }

        return res.data;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
      }
    },

    onSuccess: () => {
      const queryClient = useQueryClient();
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
        throw new Error(error instanceof Error ? error.message : "Unknown error");
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
