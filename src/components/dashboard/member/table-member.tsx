"use client"

import { useState } from "react"
import type { Member } from "@/hooks/data-member"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"

interface MemberListProps {
  initialMembers: Member[]
}

export default function MemberList({ initialMembers }: MemberListProps) {
  const [members, setMembers] = useState(initialMembers)
  // const [editingMember, setEditingMember] = useState<Member | null>(null)
  // const [isAddingMember, setIsAddingMember] = useState(false)

  // const handleAddMember = (newMember: Member) => {
  //   setMembers([...members, newMember])
  //   setIsAddingMember(false)
  // }

  // const handleUpdateMember = (updatedMember: Member) => {
  //   setMembers(members.map((member) => (member.id === updatedMember.id ? updatedMember : member)))
  //   setEditingMember(null)
  // }

  const handleDeleteMember = async (id: string) => {
    const formData = new FormData()
    formData.append("id", id)
    // await deleteMember(formData)
    setMembers(members.filter((member) => member.id !== id))
  }

  return (
    <div>
      {/* {isAddingMember && <MemberForm onSubmit={handleAddMember} onCancel={() => setIsAddingMember(false)} />} */}

      {/* {editingMember && (
        <MemberForm member={editingMember} onSubmit={handleUpdateMember} onCancel={() => setEditingMember(null)} />
      )} */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteMember(member.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

