"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatIDR } from "@/lib/utils"
import { ArrowDownRight, ArrowUpRight, GroupIcon, Users } from "lucide-react"
import { Session } from "next-auth"
import Image from "next/image"
import { JSX } from "react"

type detailOverviewTypes = {
  todaySales: number
  orderToday: number
  dailyOrderPercentage: string
}

interface CardOverviewProps {
  session: Session | null,
  detailOverview: detailOverviewTypes
}

export default function CardOverview({session, detailOverview} :CardOverviewProps): JSX.Element{
    
  return (
    <div className="grid grid-rows gap-3">
      <div>
      <Card className="w-full max-w-4xl bg-[#ff7b00]/80 text-white p-6 overflow-hidden relative h-80">
        <div className="z-20 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-white border border-slate-200 flex items-center justify-center">
              <Image
                src={session?.user?.image || "vercel.svg"}
                alt="Profile avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold ">Welcome back, {session?.user?.name}!</h2>
          </div>

          <div className="flex gap-10">
            <div className="border-r border-slate-200 pr-10">
              <div className="flex items-center gap-1">
                <span className="text-clamps font-bold ">{formatIDR(detailOverview.todaySales)}</span>
              </div>
              <p className="text-sm">Today&apos;s Sales</p>
            </div>

            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold ">{detailOverview.dailyOrderPercentage}%</span>
                {parseFloat(detailOverview.dailyOrderPercentage) ? (
                  <ArrowDownRight className="h-7 w-7 text-red-700"/>
                ) : (
                  <ArrowUpRight className="h-7 w-7 text-emerald-500" />
                )}
              </div>
              <p className="text-sm">Performance Daily</p>
            </div>
          </div>
        </div>

        <div className="z-0 absolute right-0 bottom-0 w-auto h-28 md:h-44">
          <Image
            src="/vector3d-one.png"
            alt="Person working on laptop"
            width={300}
            height={260}
            className="object-contain w-56 md:w-full"
            />
        </div>
       </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">Order Today</CardTitle>
            <GroupIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{detailOverview.orderToday || 0}</div>
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
            <p className="text-sm text-muted-foreground">Member/Pengelola</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
