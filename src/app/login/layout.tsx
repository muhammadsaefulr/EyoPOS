import { Toaster } from '@/components/ui/toaster';
import React from 'react'

interface LayoutProps {
    children: React.ReactNode;
  }

export default function layout({children}: LayoutProps) {
  return (
    <main>
        <div>{children}</div>
        <Toaster />
    </main>
  )
}
