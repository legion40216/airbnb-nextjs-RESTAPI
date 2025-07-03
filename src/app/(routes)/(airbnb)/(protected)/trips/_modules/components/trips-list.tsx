'use client';

import React from 'react'
import TripCard from './trips-list/trips-card';

type TripsItem = {
  id: string;
  listingId: string;
  locationRegion: string;
  locationLabel: string;
  imgSrc: string;
  category: string;
  price: string;
  reservationDate: string;
  isFavoritedByCurrentUser: boolean;
};

type TripsListProps = {
  data: TripsItem[];
};

export default function TripsList({ data }: TripsListProps) {
  
  return (
      <div>
        {data && data.length > 0 ? (
          <div
            className="grid grid-cols-2 gap-3 
              sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]"
          >
            {data?.map((item) => (
              <TripCard
                key={item.id}
                id={item.id}
                locationRegion= {item.locationRegion}
                locationLabel= {item.locationLabel}
                imgSrc={item.imgSrc}
                price={item.price}
                reservationDate={item.reservationDate}
                listingId={item.listingId}
                isFavoritedByCurrentUser={item.isFavoritedByCurrentUser}
              />
            ))}
          </div>
        ) : (
          <div>No results found</div>
        )}
      </div>
  )
}
