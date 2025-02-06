"use server"

import { type ReactNode } from "react"
import Sidebar from "@/components/Sidebar"
import TopNav from "@/components/TopNav"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {

 const session = await auth()

 if(!session){
  redirect("/login")
 }
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16">
          <TopNav username={session?.user.name ?? "Null"} avatarImage={session?.user.image ?? "/vercel.svg"} />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-gray-100 dark:bg-[#0F0F12]">{children}</main>
      </div>
    </div>
  )
}

