"use client";
import React from "react";
import ReservationCard from "./reservations-list/reservation-card";

type ReservationsItem = {
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

type ReservationsListProps = {
  data: ReservationsItem[];
};

export default function ReservationsList({ data }: ReservationsListProps) {
  return (
    <div>
      {data && data.length > 0 ? (
        <div
          className="grid grid-cols-2 gap-3 
          sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]"
        >
          {data?.map((item) => (
            <ReservationCard
              key={item.id}
              id={item.id}
              listingId={item.listingId}
              locationRegion={item.locationRegion}
              locationLabel={item.locationLabel}
              imgSrc={item.imgSrc}
              category={item.category}
              price={item.price}
              reservationDate={item.reservationDate}
              reservedBy={item.reservedBy}
              isFavoritedByCurrentUser={item.isFavoritedByCurrentUser}
            />
          ))}
        </div>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
}
