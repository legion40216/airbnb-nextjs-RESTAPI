import { Button } from '@/components/ui/button'
import React from 'react'

export default function CardBtn(props: React.ComponentProps<typeof Button>) {
  return (
  <Button
  className="p-0 w-full bg-brand-primary text-white
hover:bg-brand-primary/90 hover:text-white shrink" 
  size={'icon'}
  {...props}
/>
  )
}
