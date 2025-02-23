"use client"
import { columns } from "@/components/dashboard/product/product-column"
import { DataTable } from "@/components/dashboard/product/table-product"
import { ProductCatgoryData, ProductTypes} from "@/hooks/data-product"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { ProductDrawer } from "@/components/dashboard/product/product-drawer"
import { useGetAllCategoryProductQuery, useGetAllProductQuery } from "@/lib/reactquery/QueryLists"
import { LoadingWithLogo } from "@/components/loading"

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductTypes[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const {data: prod, isLoading} = useGetAllProductQuery();

  const [catProd, setCatProd] = useState<ProductCatgoryData[]>([]);
  const {data: categoryProduct} = useGetAllCategoryProductQuery();
  
  useEffect(() => {
    setCatProd(categoryProduct?.data ?? [])
  }, [categoryProduct])

  useEffect(() => {
    setProducts(prod?.data ?? []);
  }, [prod])

  console.log(prod)

  if(isLoading){
    return <LoadingWithLogo/>
  }

  return (
    <div className="bg-white p-4 rounded-md container mx-auto py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and listings
          </p>
        </div>
        <Button onClick={() => setIsDrawerOpen(true)} className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      <DataTable columns={columns} category={catProd} data={products ?? []} />
      <ProductDrawer 
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false)
        }}
      />
    </div>
  )
}

