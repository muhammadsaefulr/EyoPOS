"use client";
import { listOrderColumns } from "@/components/dashboard/order/listorder/listorder-column";
import ListOrderTable from "@/components/dashboard/order/listorder/listorder-table";
import { useGetAllOrderQuery } from "@/lib/reactquery/QueryLists";
import { Order } from "@/types/OrderProductTypes";
import { useEffect, useState } from "react";

export default function POSPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const { data: orderData } = useGetAllOrderQuery({});

  useEffect(() => {
    setOrders(orderData?.data ?? []);
  }, [orderData]);

  return (
    <div className="bg-white p-4 rounded-md container mx-auto py-10">
      <ListOrderTable columns={listOrderColumns} data={orders} />
    </div>
  );
}
