"use client"

import EmptyState from '@/components/global-ui/empty-state'
import React from 'react'

export default function Error() {
  return (
    <EmptyState 
    title='Something went wrong'
    subtitle='Please try again later'
    />
  )
}
