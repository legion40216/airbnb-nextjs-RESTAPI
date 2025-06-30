"use client";
import React from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";
import HeartButtonWithRefresh from "./favourite-card/HeartButtonWithRefresh";

type FavouriteCardProps = {
  id: string;
  locationRegion: string;
  locationLabel: string;
  imgSrc: string;
  category: string;
  price: string;
  isFavoritedByCurrentUser?: boolean;
};

export default function FavouriteCard({
  id: listingId,
  locationRegion,
  locationLabel,
  imgSrc,
  category,
  price,
  isFavoritedByCurrentUser = false,
}: FavouriteCardProps) {
  const router = useRouter();

  return (
    <div className="space-y-2">
      <div>
        {/* Image */}
        <div
          className="aspect-square overflow-hidden rounded-xl relative group 
          cursor-pointer border"
          onClick={() => router.push(`/listings/${listingId}`)}
        >
          <div className="absolute top-3 right-3 z-10">
            <HeartButtonWithRefresh 
            listingId={listingId} 
            isFavoritedByCurrentUser={isFavoritedByCurrentUser}
            />
          </div>
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 
            transition"
            src={imgSrc}
            alt="Property"
          />
        </div>
        {/* Details */}
        <div>
          <p className="font-semibold text-lg">
            <span className="text-neutral-600">{locationRegion}, </span>
            {locationLabel}
          </p>
          <p className="font-light text-neutral-500">{category}</p>
        </div>
        { /* Price */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <p className="font-semibold">{price}</p>
            <p className="font-light">night</p>
          </div>
        </div>
      </div>
    </div>
  );
}

