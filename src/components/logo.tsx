import { cn } from '@/lib/utils'
import React from 'react'


export const Logo = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex', className)}>
        <h1 className='font-light text-black'>EYO</h1>
        <h1 className='font-semibold text-primary'>POS</h1>
    </div>
  )
}
