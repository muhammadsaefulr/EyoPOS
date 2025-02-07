import MemberList from "@/components/dashboard/member/table-member"
import { Button } from "@/components/ui/button"
import {initialMembers} from "@/hooks/data-member"
import { Plus } from "lucide-react"

export default async function MembersPage() {

  return (
    <div className="container bg-white rounded-lg p-4 mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Member</h1>
          <p className="text-muted-foreground">Manage your member</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>
      <MemberList initialMembers={initialMembers} />
    </div>
  )
}

