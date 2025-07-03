// components/PropertyCard.tsx
"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

import HeartButton from "@/components/global-ui/heart-button";
import CardBtn from "@/components/global-ui/airbnb-buttons/card-btn";
import ConfirmModal from "@/components/modal/confirm-modal";
import axios from "axios";

type TripCardProps = {
  id: string;
  locationRegion: string;
  locationLabel: string;
  imgSrc: string;
  price: string;
  reservationDate: string; 
  listingId: string;
  isFavoritedByCurrentUser?: boolean;
};

export default function TripCard({
  id: reservationId,
  locationRegion,
  locationLabel,
  imgSrc,
  price,
  reservationDate,
  listingId,
  isFavoritedByCurrentUser = false
}: TripCardProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toastLoading = "Removing your Reservation... Please wait.";
  const toastMessage = "Reservation removed successfully!";

  const handleDelete = async () => {    
  const toastId = toast.loading(toastLoading);
  setIsDeleting(true);
  try {
    await axios.delete(`/api/trips/${reservationId}`);
    toast.success(toastMessage);
    router.refresh();
  } catch (error) {
    console.log(error)
    toast.error((error as any).response?.data?.error || "Something went wrong!");
  }  finally {
    setIsDeleting(false);
    setOpen(false);
    toast.dismiss(toastId);
  }
};

  return (
    <div className="space-y-2">
      <div>
        {/* Image */}
        <div
          className="aspect-square overflow-hidden rounded-xl relative group cursor-pointer border"
          onClick={() => router.push(`/listings/${listingId}`)}
        >
          <div className="absolute top-3 right-3 z-10">
            <HeartButton 
            listingId={listingId} 
            isFavoritedByCurrentUser={isFavoritedByCurrentUser}
            />
          </div>
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={imgSrc}
            alt="Reservation"
          />
        </div>
        {/* Details */}
        <div>
          <p className="font-semibold text-lg">
            <span className="text-neutral-600">{locationRegion}, </span>
            <span>{locationLabel}</span>
          </p>
          <p className="font-light text-neutral-500">
            {reservationDate}
          </p>
        </div>
         {/* Price and Reserved By */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <p className="font-semibold">{price}</p>
            <p className="font-light">night</p>
          </div>
        </div>
      </div>
        {/* Delete Button */}
      <ConfirmModal 
      onConfirm={handleDelete} 
      open={open} 
      setOpen={setOpen}
      isDisabled={isDeleting}
      >
        <CardBtn
        onClick={() => setOpen(true)}
        disabled={isDeleting}
        >
          Delete trip
        </CardBtn>
      </ConfirmModal>
    </div>
  );
}