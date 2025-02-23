import { ProductCategoryResp, ProductSchemaZod, ProductTypeRes} from "@/hooks/data-product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios"

export type ProductType = z.infer<typeof ProductSchemaZod>;

export function useGetAllCategoryProductQuery() {
  return useQuery<ProductCategoryResp>({
    queryKey: ["getAllCategoryProduct"],
    queryFn: async () => {
      const res = await fetch(`/api/product/category`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });
}

export function useAddProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: ProductType) => {
      const res = await axios.post('/api/product', newProduct)

      if (res.status == 200) {
        throw new Error("Failed to add product");
      }

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
    },
  });
}

export function useGetAllProductQuery(){
  return useQuery<ProductTypeRes>({
    queryKey: ["getAllProduct"],
    queryFn: async () => {
      const res = await fetch(`/api/product`);
      if(!res.ok) throw new Error("Failed to fetch all product");
      return res.json()
    }
  })
}