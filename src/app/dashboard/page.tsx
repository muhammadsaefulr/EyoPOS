"use client";
import React from "react";
import CardOverview from "@/components/dashboard/overview/CardOverview";
import RecentTransactions from "@/components/dashboard/overview/RencentTransactions";
import LowProductOverview from "@/components/dashboard/overview/LowProductPreview";
import { useGetAllOrderQuery } from "@/lib/reactquery/QueryLists";
import { ProductOrder } from "@/types/OrderProductTypes";
import { useSession } from "next-auth/react";
import ChartPenjualan from "@/components/dashboard/overview/ChartPenjualan";

function Dashboard() {
  const { data: session } = useSession();

  const { data: orderDaily } = useGetAllOrderQuery({ date: "daily" });
  const { data: orderWeekly } = useGetAllOrderQuery({ date: "weekly" });
  const { data: orderMonthly } = useGetAllOrderQuery({ date: "monthly"})

  const rencentProductOrder: ProductOrder[] =
  orderDaily?.data?.flatMap(order => order.items ?? []) || [];

  const allProductMonthly: ProductOrder[] = orderMonthly?.data.flatMap(order => order.items ?? []) || []

  const totalTodayOrders = orderDaily?.data?.length || 0;
  const totalWeeklyOrders = orderWeekly?.data?.length || 0;

  const previousWeeklyOrders = totalWeeklyOrders - totalTodayOrders;
  const avgPreviousWeekOrders = previousWeeklyOrders > 0 ? previousWeeklyOrders / 6 : 0;

  const dailyOrderPercentage = previousWeeklyOrders === 0
  ? 100
  : parseFloat((((totalTodayOrders - avgPreviousWeekOrders) / avgPreviousWeekOrders) * 100).toFixed(2));

  const todaySales: number = rencentProductOrder.reduce(
    (acc, v) => acc + (v?.totalPrice || 0),
    0
  );

  const overviewDetailProps = {
    todaySales: todaySales,
    orderToday: rencentProductOrder.length,
    dailyOrderPercentage: dailyOrderPercentage,
  };

  return (
    <div className="mx-auto w-full space-y-6">
      <div className="head">
        <p className="text-primary font-semibold">Dashboard Overview</p>
      </div>
      <div className="content mt-3 grid space-y-2 gap-x-6 md:grid-cols-2 ">
        <CardOverview detailOverview={overviewDetailProps} session={session} />
        <div className="w-[calc(22rem+2vw)] sm:w-[28.1rem] md:w-full">
          <ChartPenjualan productOrder={allProductMonthly} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentTransactions data={rencentProductOrder} />
        <LowProductOverview />
      </div>
    </div>
  );
}

export default Dashboard;
