"use client"

import { useEffect, useState } from "react"
import { Plus, Minus, ShoppingCart, BookDashed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetAllCategoryProductQuery, useGetAllProductQuery } from "@/lib/reactquery/QueryLists"
import { ProductCatgoryData, ProductTypes } from "@/hooks/data-product"
import { formatIDR } from "@/lib/utils"
import { Input } from "@/components/ui/input"

type OrderItem = ProductTypes & { quantity: number }

export default function ProductOrder() {
  const [orderDetails, setOrderDetails] = useState({customerName: "", totalAmount: 0})
  const [order, setOrder] = useState<OrderItem[]>([])
  const [productItem, setProductItems] = useState<ProductTypes[]>([])
  const [categoryProduct, setCategoryProduct] = useState<ProductCatgoryData[]>([])
  const [productItemFiltered, setProductItemFiltered] = useState<ProductTypes[]>([])

  const { data: products } = useGetAllProductQuery();
  const { data: category } = useGetAllCategoryProductQuery()

  useEffect(() => {
    setProductItems(products?.data ?? [])
    setProductItemFiltered(products?.data ?? [])
  }, [products])

  useEffect(() => {
    setCategoryProduct(category?.data ?? [])
  }, [category])

  useEffect(() => {
    setOrderDetails((valprev) => ({
      ...valprev,
      totalAmount: order.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }))

  }, [order])

  const setFilterProduct = (categoryId: string) => {
    const filtered = productItem.filter((val) =>  categoryId === "all" || val.categoryId == categoryId)

    setProductItemFiltered(filtered)
  }

  const addToOrder = (item: ProductTypes) => {
    setOrder((currOrder) => {
      const isItemExists = currOrder.some((orderItem) => orderItem.id === item.id);

      if (isItemExists) {
        return currOrder;
      }

      return [...currOrder, { ...item, quantity: 1}]
    })
  }

  const increaseProductQuantity = (item: ProductTypes) => {
    setOrder((currentOrder) => {
      const existingItem = currentOrder.find((orderItem) => orderItem.id === item.id)
      if (existingItem) {
        return currentOrder.map((orderItem) =>
          orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem,
        )
      }
      return [...currentOrder, { ...item, quantity: 1}]
    })
  }

  const removeFromOrder = (itemId: string) => {
    setOrder((currentOrder) => {
      const existingItem = currentOrder.find((orderItem) => orderItem.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return currentOrder.map((orderItem) =>
          orderItem.id === itemId ? { ...orderItem, quantity: orderItem.quantity - 1 } : orderItem,
        )
      }
      return currentOrder.filter((orderItem) => orderItem.id !== itemId)
    })
  }
  
  const submitOrder = () => {
    const submitVal = {
      customerName: orderDetails.customerName,
      totalPrice: orderDetails.totalAmount,
      items: order
    }

    console.log("Submit Order YGY", submitVal)
  }
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex-1 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-6">Product List</h1>
          <Select
            onValueChange={(value: unknown) => setFilterProduct(value as string)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categoryProduct.map((cat) => (
                <SelectItem key={cat.id} value={cat.categoryName}>{cat.categoryName}</SelectItem>
              ))}
            </SelectContent>
          </Select>        
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productItemFiltered.map((item) => (
            <div key={item.id} className="bg-[#fafafa] border-[#fffff0] text-card-foreground text-[#41424c] rounded-lg shadow p-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.categoryName}</p>
              <p className="mt-2">{formatIDR(item.price)}</p>
              <Button onClick={() => addToOrder(item)} className="mt-2 w-full">
                Add to Order
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-96 p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <ScrollArea className="h-[calc(86vh-300px)]">
          {order.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => removeFromOrder(item.id as string)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button disabled={item.quantity > item.stock} variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => increaseProductQuantity(item)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <Separator className="my-4" />
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">{formatIDR(orderDetails.totalAmount)}</span>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="">
            <label className="text-sm ">Input Order Name: </label>
            <Input type="text" onChange={(e) => setOrderDetails((prev) => ({...prev, customerName: e.target.value }))} placeholder="input order name" />
          </div>
        <Button onClick={() => submitOrder()} className="w-full" size="lg">
          <BookDashed className="mr-2 h-4 w-4" /> Make invoice and order
        </Button>
        </div>
      </div>
    </div>
  )
}

