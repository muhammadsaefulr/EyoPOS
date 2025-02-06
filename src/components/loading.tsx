import React from 'react'
import { Logo } from './logo'

export const LoadingWithLogo = () => {
  return (
    <div className='bg-transparent min-h-screen flex items-center justify-center text-6xl'>
      <div className="animate-pulse">
      <Logo/>
      </div>
</div>
  )
}
