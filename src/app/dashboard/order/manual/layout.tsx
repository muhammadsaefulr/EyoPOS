"use server"

import { type ReactNode } from "react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

interface LayoutProps {
  children: ReactNode
}

export default async function ManualOrderLayout({ children }: LayoutProps) {
  
  return (
    <div className="overflow-x-hidden scrollbar-hidden max-h-[99%] p-2">
        <main className="flex-1 p-2 rounded-md bg-white scrollbar-hidden">{children}</main>
    </div>
  )
}

