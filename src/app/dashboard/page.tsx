"use client"
import { auth, signOut } from '@/auth'
import React, { useEffect, useState } from 'react'
import { redirect } from "next/navigation"
import { LoadingWithLogo } from '@/components/loading'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CardOverview from '@/components/dashboard/overview/CardOverview'
import RecentTransactions from '@/components/dashboard/overview/RencentTransactions'
import ProductOverview from '@/components/dashboard/overview/ProductOverview'

function Dashboard() {

  return (
    <div className="container mx-auto p-4 space-y-6">
        <div className="head">
        <p className='text-primary font-semibold'>Dashboard Overview</p>
      </div>
      <div className="content space-y-9 mt-3">
      <CardOverview/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentTransactions />
        <ProductOverview/>
      </div>
    </div>
  )
}

export default Dashboard