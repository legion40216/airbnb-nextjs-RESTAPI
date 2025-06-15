"use client"
import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ListingCardSkeleton() {
  return (
    <Card className="w-[200px] rounded-2xl shadow-sm p-2">
      <CardContent className="p-2 space-y-2">
        {/* Image placeholder */}
        <Skeleton className="h-36 w-full rounded-xl" />

        {/* Title placeholder */}
        <Skeleton className="h-3 w-2/4" />

        {/* Description lines */}
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-3/6" />

        {/* Button or price */}
        <Skeleton className="h-4 w-10 mt-2" />
      </CardContent>
    </Card>
  );
}
