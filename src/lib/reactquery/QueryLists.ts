import { ProductCategory } from "@/hooks/data-product";
import { useQuery } from "@tanstack/react-query";

export function useGetAllCategoryProductQuery() {
  return useQuery<ProductCategory>({
    queryKey: ["getAllCategoryProduct"],
    queryFn: async () => {
      const res = await fetch(`/api/product/category`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });
}
