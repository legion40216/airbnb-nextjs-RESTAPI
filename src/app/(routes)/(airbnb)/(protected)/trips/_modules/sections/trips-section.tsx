'use client';
import React from 'react';
import TripsList from '../components/trips-list';

type TripsSectionProps = {
  initialData: {
    id: string;
    listingId: string;
    locationRegion: string;
    locationLabel: string;
    imgSrc: string;
    category: string;
    price: string;
    reservationDate: string;
    isFavoritedByCurrentUser: boolean;
  }[];
};

export default function TripsSection({
  initialData,
}: TripsSectionProps) {
  return (
    <TripsList data={initialData}/>
  )
}


