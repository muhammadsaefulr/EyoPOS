"use server"

import { type ReactNode } from "react"
import Sidebar from "@/components/Sidebar"
import TopNav from "@/components/TopNav"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import ClientLayout from "./ClientLayout"
import { SessionProvider } from "next-auth/react"
import ReactQueryProvider from "@/lib/reactquery/ReactQueryClient"
import { Toaster } from "@/components/ui/toaster"

interface LayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: LayoutProps) {

 const session = await auth()

 if(!session){
  redirect("/login")
 }
  
  return (
    <ClientLayout>
    <ReactQueryProvider>
    <SessionProvider session={session}>
    <div className="flex h-screen">
      <div className="overflow-y-auto scrollbar-hidden">
      <Sidebar />
      </div>
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16">
          <TopNav username={session?.user.name ?? "Null"} avatarImage={session?.user.image ?? "/vercel.svg"} />
        </header>
        <main className="flex-1 overflow-auto p-4 bg-gray-100 dark:bg-[#0F0F12] scrollbar-hidden">{children}</main>
        <Toaster/>
      </div>
    </div>
    </SessionProvider>
    </ReactQueryProvider>
    </ClientLayout>
  )
}

