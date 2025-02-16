"use client"
import { columns } from "@/components/dashboard/product/product-column"
import { DataTable } from "@/components/dashboard/product/table-product"
import { Product, productsInit } from "@/hooks/data-product"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { ProductDrawer } from "@/components/dashboard/product/product-drawer"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(productsInit)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { toast } = useToast()

  // const handleAddProduct = (newProduct: Omit<Product, "id">) => {
  //   const id = (products.length + 1).toString()
  //   setProducts([...products, { ...newProduct, id }])
  //   setIsDrawerOpen(false)
  //   toast({
  //     title: "Product added",
  //     description: `${newProduct.name} has been added successfully.`,
  //   })
  // }


  return (
    <div className="bg-white p-4 rounded-md container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory and listings</p>
        </div>
        <Button onClick={() => setIsDrawerOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      <DataTable columns={columns} data={products} />
      <ProductDrawer 
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false)
        }}
      />
    </div>
  )
}

