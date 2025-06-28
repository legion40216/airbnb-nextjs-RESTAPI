// components/ReservationCard.tsx
"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";

import ConfirmModal from "@/components/modal/confirm-modal";
import CardBtn from "@/components/global-ui/airbnb-buttons/card-btn";
import HeartButton from "@/components/global-ui/heart-button";


type ReservationCardProps = {
  id: string;
  listingId: string;
  locationRegion: string;
  locationLabel: string;
  imgSrc: string;
  category: string;
  price: string;
  reservationDate: string;
  reservedBy?: string; 
  isFavoritedByCurrentUser?: boolean;
};

export default function ReservationCard({
  id: reservationId,
  listingId,
  locationRegion,
  locationLabel,
  imgSrc,
  price,
  reservationDate, 
  reservedBy,
  isFavoritedByCurrentUser,
}: ReservationCardProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toastLoading = "Deleting Reservation... Please wait.";
  const toastMessage = "Reservation deleted successfully!";

  const handleDelete = async () => {    
  const toastId = toast.loading(toastLoading);
  try {
    await axios.delete(`/api/reservations/${reservationId}`);
    toast.success(toastMessage);
    router.refresh();
  } catch (error) {
    console.log(error)
    toast.error((error as any).response?.data?.error || "Something went wrong!");
  }  finally {
    setOpen(false);
    toast.dismiss(toastId);
  }
};
  
  return (
    <div className="space-y-2">
      <div>
        {/* Image with heart button */}
        <div
          className="aspect-square overflow-hidden rounded-xl relative 
          group cursor-pointer border"
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
            className="object-cover h-full w-full group-hover:scale-110
             transition"
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

        {/* Price && Reservation-Period */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <p className="font-semibold">{price}</p>
            <p className="font-light">night</p>
          </div>
          <div>
            <p className='font-semibold'>
              <span className='font-light'>Reserved by: </span>
              <span>{reservedBy}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <ConfirmModal 
      onConfirm={handleDelete} 
      open={open} 
      setOpen={setOpen}
      >
        <CardBtn
        onClick={() => setOpen(true)}
        disabled={false}
        >
          Delete Reservation
        </CardBtn>
      </ConfirmModal>
    </div>
  );
}