"use client"

import { useState, useEffect } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { FormDataProductType, ProductTypes } from "@/hooks/data-product"
import { useToast } from "@/hooks/use-toast"

type ProductDrawerProps = {
  isOpen: boolean
  onClose: () => void
  product?: ProductTypes | null
}

export function ProductDrawer({ isOpen, onClose, product }: ProductDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { toast } = useToast()

  const handleSubmit = (productData: FormDataProductType) => {
    console.log(productData)
    toast({
      title: "Product added",
      description: `${product?.name} has been ${product ? "updated" : "added"} successfully.`,
    })
  }

  return isDesktop ? (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <ProfileForm product={product} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{product ? "Edit Product" : "Add New Product"}</DrawerTitle>
        </DrawerHeader>
        <ProfileForm product={product} onSubmit={handleSubmit} />
      </DrawerContent>
    </Drawer>
  )
}

type ProfileFormProps = {
  product?: ProductTypes | null
  onSubmit: (product: FormDataProductType) => void;
}

function ProfileForm({ product, onSubmit }: ProfileFormProps) {
  const [formData, setFormData] = useState<FormDataProductType>({
    name: "",
    category: "",
    price: 0,
    distPrice: 0,
    stock: 0,
    updatedBy: "",
    addedBy: ""
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        distPrice: product.distPrice,
        stock: product.stock,
        addedBy: product.addedBy,
        updatedBy: product.updatedBy
      })  
    } else {
      setFormData({
        name: "",
        category: "",
        price: 0,
        distPrice: 0,
        stock: 0,
        updatedBy: ""
      }) 
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" || name === "rating" ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 lg:grid lg:grid-cols-2 gap-4">
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="category">Product Category</Label>
        <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="price">Product Price</Label>
        <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="distPrice">Product Distributor Price</Label>
        <Input id="distPrice" name="distPrice" type="number" value={formData.distPrice} onChange={handleChange} required />
      </div>
    </div>
      <div className="space-y-4">
      <div>
        <Label htmlFor="stock">Product Stock</Label>
        <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="addedBy">Added By</Label>
        <Input id="addedBy" name="addedBy" value={formData.addedBy} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="updatedBy">Updated By</Label>
        <Input id="updatedBy" name="updatedBy" value={formData.updatedBy} onChange={handleChange} required />
      </div>
    </div>
  
    <div className="col-span-2 mt-4">
      <DrawerFooter>
        <Button type="submit">{product ? "Update" : "Add"} Product</Button>
      </DrawerFooter>
    </div>
  </form>
  
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
