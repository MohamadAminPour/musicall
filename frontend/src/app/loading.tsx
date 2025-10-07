import Loader from '@/components/Loader'
import React from 'react'

export default function loading() {
  return (
    <div className='w-full h-screen bg-zinc-900 flex items-center justify-center fixed z-50'>
      <Loader/>
    </div>
  )
}
