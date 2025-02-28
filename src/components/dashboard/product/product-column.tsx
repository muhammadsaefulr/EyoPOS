"use client"

import type { ColumnDef, Row } from "@tanstack/react-table"
import type { ProductTypes } from "@/hooks/data-product"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowUpDown, MoreHorizontal } from "lucide-react"
import React, { useState } from "react"
import { ProductDrawer } from "./product-drawer"
import { useDeleteProductByIdMutation } from "@/lib/reactquery/QueryLists"
import { useToast } from "@/hooks/use-toast"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { RestockDrawer } from "./product-restock-drawer"


export const columns: ColumnDef<ProductTypes>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Product Name
          <ArrowUpDown className="ml-3 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const productName: string = row.getValue("name")

      return <div className="mx-4">{productName}</div>
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
      }).format(price)
      return <div className="font-medium mx-3">{formatted}</div>
    },
  },
  {
    accessorKey: "distPrice",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Distributor Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("distPrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
      }).format(price)
      return <div className="font-medium mx-4">{formatted}</div>
    },
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="font-medium">
          {row.getValue("categoryName")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      
      const stock = Number.parseInt(row.getValue('stock'))

      let status: "in_stock" | "low_stock" | "out_of_stock"

      if (stock <= 0) {
        status = "out_of_stock";
      } else if (stock <= 20) {
        status = "low_stock";
      } else {
        status = "in_stock";
      }

      return (
        <Badge
          className={
            status === "in_stock"
              ? "bg-green-100 text-green-800"
              : status === "low_stock"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }
        >
          {status.replace("_", " ")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium mx-5">{row.getValue("stock")}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />
    },
]

function ActionCell({ row }: { row: Row<ProductTypes> }) {
  const product = row.original
  const { toast } = useToast()
  const [isDrawerProductOpen, setIsDrawerProductOpen] = useState(false)
  const [isDrawerProductRestockOpen, setIsDrawerProductRestockOpen] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const deleteMutation = useDeleteProductByIdMutation()

  const handleDeleteById = (prodId: string) => {
    deleteMutation.mutate(prodId)
  }

  React.useEffect(() => {
    if (deleteMutation.isError) {
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: `Failed to process task, because error status: ${deleteMutation.status}`,
      })
    } else if (deleteMutation.isSuccess) {
      toast({
        title: "Berhasil",
        description: `Berhasil menghapus data`,
      })
    }
  }, [deleteMutation.isError, deleteMutation.isSuccess, deleteMutation.status, toast])

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsDrawerProductRestockOpen(true)}>Restock Product</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDrawerProductOpen(true)}>Detail Produk</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenDeleteAlert(true)} className="text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
        <ProductDrawer
          isOpen={isDrawerProductOpen}
          onClose={() => {
            setIsDrawerProductOpen(false)
          }}
          product={product}
        />
        <RestockDrawer isOpen={isDrawerProductRestockOpen} onClose={() => setIsDrawerProductRestockOpen(false)} productId={product.id as string}/>
      </DropdownMenu>

      <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <AlertTriangle className="w-5 h-5 inline mr-2 text-red-500" />
            Warning
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this product will remove all data associated with it. Are you sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpenDeleteAlert(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteById(product.id as string)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

