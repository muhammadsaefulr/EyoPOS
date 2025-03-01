"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import type { Order } from "@/types/OrderProductTypes"

type BulkActionsProps = {
  selectedOrders: Order[]
  onStatusChange: (orders: Order[], newStatus: Order["status"]) => void
  onDelete: (orders: Order[]) => void
}

export function BulkActions({ selectedOrders, onStatusChange, onDelete }: BulkActionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleStatusChange = (newStatus: Order["status"]) => {
    onStatusChange(selectedOrders, newStatus)
    setIsOpen(false)
  }

  const handleDelete = () => {
    onDelete(selectedOrders)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Bulk Actions
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleStatusChange("pending")}>Set to Pending</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("processing")}>Set to Processing</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("completed")}>Set to Completed</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("cancelled")}>Set to Cancelled</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          Delete Selected
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

