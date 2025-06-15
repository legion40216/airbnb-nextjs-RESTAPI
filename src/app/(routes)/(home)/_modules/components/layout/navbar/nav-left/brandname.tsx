import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Brandname() {
  return (
    <Link href="/" className="block">
      <div className="relative w-24 h-10">
        <Image
          alt="logo"
          src="/images/logo.png"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  )
}
