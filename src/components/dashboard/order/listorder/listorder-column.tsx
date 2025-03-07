"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Clock, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/types/OrderProductTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddInvoiceMutation, useUpdateOrderMutation } from "@/lib/reactquery/QueryLists";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    completed: "bg-green-100 text-green-800 hover:bg-green-100",
    processing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  const style =
    statusStyles[status as keyof typeof statusStyles] ||
    "bg-gray-100 text-gray-800";

  return (
    <Badge className={`${style} font-medium`} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const ActionComponents = ({ order }: { order: Order }) => {
  const updateOrderMutation = useUpdateOrderMutation();
  const addInvoiceOrderMutation = useAddInvoiceMutation();

  useEffect(() => {
    if(addInvoiceOrderMutation.isSuccess) {
      toast({
        title: "Invoice created !",
        description: `Invoice ${addInvoiceOrderMutation.data?.data?.id} has been created successfully`,
      })
    }
  }, [addInvoiceOrderMutation.status])

  const updateStatusOrder = () => {
    order.status = "cancelled";
    updateOrderMutation.mutate(order);
  };

  const generateInvoice = () => {
    addInvoiceOrderMutation.mutate({
      orderId: order.id,
      totalAmount: order.totalPrice,
      status: "unpaid",
      issuedAt: new Date().toString(),
      dueDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24).toString(),
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuItem onClick={() => generateInvoice()}>Make Invoice</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => updateStatusOrder()}
            className="text-red-600"
          >
            Cancel order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const listOrderColumns: ColumnDef<Order>[] = [
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
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => <div>{row.getValue("customerName")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{format(date, "MMM dd, yyyy")}</span>
        </div>
      );
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    filterFn: (row, id, value) => {
      return value === "all" || row.getValue(id) === value;
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
      }).format(amount);
      return <div className="font-medium mx-4">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="text-right">
          <ActionComponents order={order} />
        </div>
      );
    },
  },
];
