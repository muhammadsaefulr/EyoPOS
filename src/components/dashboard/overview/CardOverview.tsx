"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetAllOrderQuery } from "@/lib/reactquery/QueryLists"
import { formatIDR } from "@/lib/utils"
import { OrderResponse } from "@/types/OrderProductTypes"
import { DollarSign, GroupIcon, TrendingUp, Users } from "lucide-react"

interface CardOverviewProps {
  order: OrderResponse["data"] | undefined
}

export default function CardOverview(data: CardOverviewProps) {

  const {data: order} = useGetAllOrderQuery({date: "daily"})

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-clamps text-md font-bold">{formatIDR(12000)}</div>
          <p className="text-sm text-muted-foreground">Pendapatan Bersih Bulan Ini</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Order Today</CardTitle>
          <GroupIcon className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.order?.length}</div>
          <p className="text-sm text-muted-foreground">Jumlah order hari ini</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">User Group</CardTitle>
          <Users className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
          <p className="text-sm text-muted-foreground">User Yang Ada Di Grup POS Ini</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Kategori Terlaris</CardTitle>
          <TrendingUp className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">Sparepart</div>
          <p className="text-sm text-muted-foreground">Kategori dengan penjualan terbaik hari ini</p>
        </CardContent>
      </Card>
    </div>
  )
}

