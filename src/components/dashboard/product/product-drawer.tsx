"use client"

import { useState, useEffect } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Product } from "@/hooks/data-product"
import { useToast } from "@/hooks/use-toast"

type ProductDrawerProps = {
  isOpen: boolean
  onClose: () => void
  product?: Product | null
}

export function ProductDrawer({ isOpen, onClose, product }: ProductDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { toast } = useToast()

  const handleSubmit = (productData: Omit<Product, "id"> & { id?: string }) => {
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
  product?: Product | null
  onSubmit: (product: Omit<Product, "id"> & { id?: string }) => void
}

function ProfileForm({ product, onSubmit }: ProfileFormProps) {
  const [formData, setFormData] = useState<Omit<Product, "id"> & { id?: string }>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    status: "in_stock",
    rating: 0,
    createdAt: new Date().toISOString(),
  })

  useEffect(() => {
    if (product) {
      setFormData(product)  
    } else {
      setFormData({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        status: "in_stock",
        rating: 0,
        createdAt: new Date().toISOString(),
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
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
      </div>
      <DrawerFooter>
        <Button type="submit">{product ? "Update" : "Add"} Product</Button>
      </DrawerFooter>
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
