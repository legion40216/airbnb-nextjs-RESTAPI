"use client"
import React from 'react'
import EmptyState from '@/components/global-ui/empty-state'

export default function Error() {
  return (
    <EmptyState 
    title='Something went wrong'
    subtitle='Please try again later'
    />
  )
}
