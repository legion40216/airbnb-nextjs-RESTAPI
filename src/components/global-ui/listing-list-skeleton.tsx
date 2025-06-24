import React from 'react'
import ListingCardSkeleton from './listing-card-skeleton'
export default function ListingListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {[...Array(6)].map((_, index) => (
        <ListingCardSkeleton key={index} />
      ))}
    </div>
  )
}
