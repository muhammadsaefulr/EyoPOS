import { TriangleAlert } from 'lucide-react'
import React from 'react'

export default function NextUpdatePage() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className="mx-auto">
        <TriangleAlert className="w-44 h-44 text-primary mx-auto" />
        <h1 className="text-2xl text-center">Fitur ini tersedia di update berikutnya!</h1>
      </div>
    </div>
  )
}
