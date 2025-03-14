"use client"
import React from 'react'
import CardOverview from '@/components/dashboard/overview/CardOverview'
import RecentTransactions from '@/components/dashboard/overview/RencentTransactions'
import LowProductOverview from '@/components/dashboard/overview/LowProductPreview'
import { useGetAllOrderQuery } from '@/lib/reactquery/QueryLists'
import { ProductOrder } from '@/types/OrderProductTypes'

function Dashboard() {

  const {data: order} = useGetAllOrderQuery({date: "daily"})

  const rencentProductOrder: ProductOrder[] = order?.data
  ?.flatMap((order) => order.items ?? []) || [];

  return (
    <div className="container mx-auto p-4 space-y-6">
        <div className="head">
        <p className='text-primary font-semibold'>Dashboard Overview</p>
      </div>
      <div className="content space-y-9 mt-3">
      <CardOverview order={order?.data}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentTransactions data={rencentProductOrder}/>
        <LowProductOverview/>
      </div>
    </div>
  )
}

export default Dashboard