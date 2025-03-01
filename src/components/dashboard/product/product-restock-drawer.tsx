"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"
import { RestockSchema } from "@/types/ProductTypes"
import { useRestockProductMutation } from "@/lib/reactquery/QueryLists"

type RestockFormData = z.infer<typeof RestockSchema>

type RestockDrawerProps = {
  isOpen: boolean
  onClose: () => void
  productId: string
}

export function RestockDrawer({ isOpen, onClose, productId }: RestockDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { toast } = useToast()
  const { data: session } = useSession()
  const restockMutation = useRestockProductMutation()

  const form = useForm<RestockFormData>({
    resolver: zodResolver(RestockSchema),
    defaultValues: {
      productId: productId,
      quantity: 1,
      pricePerUnit: 0,
      totalCost: 0,
      restockedBy: session?.user.name ?? "",
      restockedByUserId: session?.user.id ?? ""
    },
  })

  const handleSubmit = (data: RestockFormData) => {
    restockMutation.mutate(data)
    
    toast({ title: "Product restocked", description: "Restock successfully added." })
    form.reset()
    onClose()
    
  }

  useEffect(() => {
    const { quantity, pricePerUnit } = form.getValues()
    form.setValue("totalCost", quantity * pricePerUnit)
  }, [form.watch("quantity"), form.watch("pricePerUnit")])

  return isDesktop ? (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Restock Product</DialogTitle>
        </DialogHeader>
        <RestockForm form={form} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Restock Product</DrawerTitle>
        </DrawerHeader>
        <RestockForm form={form} onSubmit={handleSubmit} />
      </DrawerContent>
    </Drawer>
  )
}

type RestockFormProps = {
  form: ReturnType<typeof useForm<RestockFormData>>
  onSubmit: (data: RestockFormData) => void
}

function RestockForm({ form, onSubmit }: RestockFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 grid gap-4">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pricePerUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Per Unit</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalCost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Cost</FormLabel>
              <FormControl>
                <Input type="number" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="restockedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restocked By</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">Restock</Button>
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
