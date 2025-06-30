// components/PropertyCard.tsx
"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import axios from "axios";

import HeartButton from "@/components/global-ui/heart-button";
import CardBtn from "@/components/global-ui/airbnb-buttons/card-btn";
import ConfirmModal from "@/components/modal/confirm-modal";

type PropertyCardProps = {
  id: string;
  locationRegion: string;
  locationLabel: string;
  imgSrc: string;
  category: string;
  price: string;
  isFavoritedByCurrentUser?: boolean;
};

export default function PropertyCard({
  id: listingId,
  locationRegion,
  locationLabel,
  imgSrc,
  category,
  price,
  isFavoritedByCurrentUser = false,
}: PropertyCardProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toastLoading = "Deleting property... Please wait.";
  const toastMessage = "Property deleted successfully!";

  const handleDelete = async () => {    
  const toastId = toast.loading(toastLoading);
  setIsDeleting(true);
  try {
    await axios.delete(`/api/listings/${listingId}`);
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
        {/* Image and Details */}
        <div
          className="aspect-square overflow-hidden rounded-xl relative group 
          cursor-pointer border"
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
      { /* Delete Button */}
      <ConfirmModal 
      onConfirm={handleDelete} 
      open={open} 
      setOpen={setOpen} 
      isDisabled={isDeleting}>
        <CardBtn
          onClick={() => setOpen(true)}
          disabled={isDeleting}
        >
          Delete property
        </CardBtn>
      </ConfirmModal>
    </div>
  );
}