"use client"

import React from 'react'

export default function Error({ error }: { error: Error }) {
  return (
    <div className='grid gap-2 place-content-center h-[60vh] space-y-4'>
      <div className='text-center'>
        <p className='text-2xl font-bold'>Something went wrong</p>
        <p className='font-light text-neutral-500'>Please try again later</p>
      </div>
    </div>
  )
}
