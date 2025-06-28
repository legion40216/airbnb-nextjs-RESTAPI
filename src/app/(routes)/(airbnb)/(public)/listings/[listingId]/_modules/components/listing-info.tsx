import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Category } from '@/constants/categoryIcons';

interface ListingInfoProps {
  description: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  userName: string;
  userImg: string | null;
  category?: Category;
}

export default function ListingInfo({
  description,
  roomCount,
  bathroomCount,
  guestCount,
  userName,
  userImg,
  category,
}: ListingInfoProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        {/* Name and Image  */}
        <div className="flex gap-2 items-center text-xl font-semibold">
          <p>Hosted by {userName}</p>
          <Avatar>
            {userImg ? (
              <AvatarImage src={userImg} />
            ) : null}
            <AvatarFallback>
              {userName ? userName.charAt(0) : "?"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Details */}
        <div className="flex gap-2 font-light text-neutral-500">
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathroomCount} bathrooms</p>
        </div>
      </div>

      <Separator />

      {/* Icon */}          
      {category && (
        <div className="flex items-center gap-2">
          <category.icon size={40} className="text-neutral-600" />
          <div>
            <p className="text-lg font-semibold">{category.label}</p>
            <p className="text-neutral-500 font-light">{category.description}</p>
          </div>
        </div>
      )}

      <Separator />

      {/* Description */}
      <div className="font-light text-neutral-500">
        {description}
      </div>
    </div>
  )
}