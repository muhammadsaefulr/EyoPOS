"use client"
import { auth, signOut } from '@/auth'
import React, { useEffect, useState } from 'react'
import { redirect } from "next/navigation"
import { LoadingWithLogo } from '@/components/loading'

function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <LoadingWithLogo />;
  }

  return (
    <div>
        <div className="">
            <p>Dashboard</p>
        </div>
    </div>
  )
}

export default Dashboard