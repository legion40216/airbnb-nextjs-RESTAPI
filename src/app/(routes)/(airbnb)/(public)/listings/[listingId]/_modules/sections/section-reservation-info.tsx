import React from "react";
import ListingInfo from "../components/listing-info";
import ListingReservation from "../components/listing-reservation";
import { categories } from "@/constants/categoryIcons";

type SectionReservationInfoProps = {
    listingId: string;
    category: string;
    price: number;
    description: string;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
    userName: string;
    userImg: string;
    reservations: Array<{
        startDate: Date | string;
        endDate: Date | string;
    }>;
}

export default function SectionReservationInfo({
    reservationData,
    }: {
    reservationData: SectionReservationInfoProps;
}) {
  const category = categories.find((item) => {
    return item.label === reservationData.category;
  });

 const formattedReservations = reservationData.reservations.map((item) => ({
    startDate: new Date(item?.startDate),
    endDate: new Date(item?.endDate),
  }));

  return (
    <>
      <ListingInfo 
        category={category} 
        description={reservationData.description}
        roomCount={reservationData.roomCount}
        bathroomCount={reservationData.bathroomCount}
        guestCount={reservationData.guestCount}
        userName={reservationData.userName}
        userImg={reservationData.userImg}
      />

      <ListingReservation
        listingId={reservationData.listingId}
        price={reservationData.price}
        reservations={formattedReservations}
      />
    </>
  );
}
