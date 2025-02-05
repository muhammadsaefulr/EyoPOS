import { auth, signOut } from '@/auth'
import React from 'react'
import { redirect } from "next/navigation"
import SignoutButton from '@/components/auth/BtnLogout'

async function Dashboard() {
    const session = await auth()

    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/dashboard")
      }

  return (
    <div>
        <div className="">
            <p>{session.user.name}</p>
            <SignoutButton  signOut={async () => {
            "use server"
            await signOut({redirectTo: "/"})
          }} />
        </div>
    </div>
  )
}

export default Dashboard