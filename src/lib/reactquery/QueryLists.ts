import { ProductCategoryResp, ProductCatgoryData, ProductSchemaZod, ProductTypeRes, RestockTypes} from "@/types/ProductTypes";
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

export function useAddCategoryProductMutation(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: ProductCatgoryData) => {
      try {
        const res = await axios.post('/api/product/category', category)  
        if (res.status !== 200) {
          throw new Error("Failed to add product");
        }

        return res.data;     
      } catch(error){
        throw new Error(error instanceof Error ? error.message : "Unknown error");
      }
    },
    
    
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getAllCategoryProduct"]})
    }
  })
}

export function useUpdateCategoryProductMutation(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({paramId, category}: {paramId: string, category: ProductCatgoryData}) => {
      try {
        const res = await axios.put(`/api/product/category/${paramId}`, category)

        if (res.status !== 200) {
          throw new Error("Failed to add product");
        }

        return res.data;
      } catch (error){
        throw new Error(error instanceof Error ? error.message : "Unknown error");
      }
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getAllCategoryProduct"]})
    }
  })
}

export function useDeleteCategoryProductByIdMutation(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paramId: string) => {
      const res = await axios.delete(`/api/product/category/${paramId}`)

      if(res.status != 200){
        throw new Error("Failed to delete category product")
      }

      return res.data
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getAllCategoryProduct"]})
      
    }
  })
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({paramId, product}: {paramId: string, product: ProductType}) => {
      try {
        const res = await axios.put(`/api/product/${paramId}`, product);

        if (res.status !== 200) {
          throw new Error("Failed to update product");
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

export function useRestockProductMutation(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (restockScheme: RestockTypes) => {
      try {
        const res = await axios.post(`/api/product/restock`, restockScheme)
      
        if (res.status !== 200) {
          throw new Error("Failed to delete product");
        }
        return res.data;
      } catch(error){
        throw new Error(error instanceof Error ? error.message : "Unknown error");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
    },
    onError: (error) => {
      console.error(error);
    },
  })
}

export function useAddOrderMutation(){
  return useMutation({
    mutationFn: async () => {
      
    }
  })
}