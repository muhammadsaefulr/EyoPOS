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

  const { data: orderMonthly } = useGetAllOrderQuery({ date: "monthly"});
  let dailyOrderPercentage = "";
  
  const orderDaily = orderMonthly?.data?.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate.toDateString() === new Date().toDateString();
  });

    const orderWeekly = orderMonthly?.data?.filter(order => {
      const orderDate = new Date(order.createdAt);
      const weekStart = new Date(new Date());
      weekStart.setDate(new Date().getDate() - new Date().getDay()); 
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6); 

      return orderDate >= weekStart && orderDate <= weekEnd;
  });

  const rencentProductOrder: ProductOrder[] =
  orderMonthly?.data?.flatMap(order => order.items ?? []) || [];

  const allProductMonthly: ProductOrder[] = orderMonthly?.data.flatMap(order => order.items ?? []) || []

  const sortedDates = [...new Set(orderMonthly?.data.map(order => order.createdAt?.split("T")[0]))].sort();

  console.log("Sorted dates: ",sortedDates)

  const orderCountPerDay = {};
  orderWeekly?.forEach(order => {
      const date = order.createdAt.split("T")[0]; 
      orderCountPerDay[date] = (orderCountPerDay[date] || 0) + 1;
  });

  if (sortedDates.length >= 2) {
    const today = sortedDates[sortedDates.length - 1];
    const yesterday = sortedDates[sortedDates.length - 2];

    const todayOrders = orderCountPerDay[today];
    const yesterdayOrders = orderCountPerDay[yesterday];

    const growth = ((todayOrders - yesterdayOrders) / yesterdayOrders) * 100;

    dailyOrderPercentage = growth.toFixed(2)
  } else {
    dailyOrderPercentage = "0"
  }
  const todaySales: number = orderDaily
  ?.flatMap(order => order.items ?? [])
  .reduce((acc, v) => acc + (v.totalPrice || 0), 0) || 0;

  console.log(orderDaily
    ?.flatMap(order => order.items ?? []))

  const overviewDetailProps = {
    todaySales: todaySales,
    orderToday: orderDaily?.length || 0,
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
