import React from 'react'

interface HeadingsProps {
    title: string;
    subtitle: string;
}

export default function Headings({
    title,
    subtitle
}: HeadingsProps) {
  return (
    <div>
        <h2 className="text-3xl font-bold tracking-tigh"> {title} </h2>
        <p className="text-sm text-muted-foreground"> {subtitle} </p>
    </div>
  )
}
