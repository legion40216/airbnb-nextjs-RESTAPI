import React from 'react'
import ReservationsList from '../components/reservations-list'

type SectionReservationsProps = {
  formattedListings: {
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
  }[];
}

export default function SectionReservations(
    { formattedListings }: SectionReservationsProps
) {
  return (
    <>
      <ReservationsList data={formattedListings} />
    </>
  )
}
