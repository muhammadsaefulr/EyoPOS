"use server"

import { type ReactNode } from "react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

interface LayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: LayoutProps) {

 const session = await auth()

 if(!session){
  redirect("/login")
 }
  
  return (
    <div className="overflow-x-hidden scrollbar-hidden max-h-[99%] p-2">
        <main className="flex-1 overflow-auto p-2 rounded-md bg-white">{children}</main>
    </div>
  )
}

