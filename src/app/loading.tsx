"use client"
import React from "react"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex items-center justify-center">
      <span className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-muted border-t-primary" />
      <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}