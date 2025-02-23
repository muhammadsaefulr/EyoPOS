"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form"
import type { ProductTypes } from "@/hooks/data-product"
import { ProductSchemaZod } from "@/hooks/data-product"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAddProductMutation, useGetAllCategoryProductQuery } from "@/lib/reactquery/QueryLists"

type ProductFormData = z.infer<typeof ProductSchemaZod>

type ProductDrawerProps = {
  isOpen: boolean
  onClose: () => void
  product?: ProductTypes | null
}

export function ProductDrawer({ isOpen, onClose, product }: ProductDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { toast } = useToast()
  const { data: session } = useSession()
  const mutation = useAddProductMutation();

  const handleSubmit = (productData: ProductFormData) => {
    console.log("✅ Form submitted with data:", productData);

    if(product){
      console.log(productData)
    } else {
      mutation.mutate(productData)
    }

    // onClose()

    toast({
      variant: "default",
      title: "Product added",
      description: `${productData.name} has been ${product ? "updated" : "added"} successfully.`,
    })
  }

  return isDesktop ? (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <ProductForm sessions={session} product={product} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{product ? "Edit Product" : "Add New Product"}</DrawerTitle>
        </DrawerHeader>
        <ProductForm sessions={session} product={product} onSubmit={handleSubmit} />
      </DrawerContent>
    </Drawer>
  )
}

type ProductFormProps = {
  product?: ProductTypes | null
  sessions: Session | null
  onSubmit: (product: ProductFormData) => void
}

function ProductForm({ product, sessions, onSubmit }: ProductFormProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchemaZod),
    defaultValues: {
      name: "",
      categoryId: Number(null),
      price: 0,
      distPrice: 0,
      sold: 0,
      stock: 0,
      addedBy: sessions?.user.name ?? "",
      updatedBy: sessions?.user.name ?? "",
    },
  })

  const {data: categoryProduct} = useGetAllCategoryProductQuery();
  // console.log(categoryProduct)

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        categoryId: Number(product.categoryId),
        price: Number(product.price),
        distPrice: Number(product.distPrice),
        stock: Number(product.stock),
        sold: 0,
        addedBy: product.addedBy,
        updatedBy: sessions?.user.name ?? "",
      })
    }
  }, [product, form, sessions])

  if(form.formState.errors) {
    console.log("form error: ", form.formState.errors)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 lg:grid lg:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Category</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder={field.value ? categoryProduct?.data.find((cat) => cat.id === field.value)?.categoryName : "Select Category"} />
              </SelectTrigger>
              <SelectContent>
                {categoryProduct?.data.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="distPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Distributor Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Stock</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="addedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Added By</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="updatedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Updated By</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="col-span-2 mt-4">{product ? "Update" : "Add"} Product</Button>
      </form>
    </Form>
  )
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => setMatches(media.matches)
    setMatches(media.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
