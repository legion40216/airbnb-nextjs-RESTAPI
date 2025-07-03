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
    initialData,
    }: {
    initialData: SectionReservationInfoProps;
}) {
  const category = categories.find((item) => {
    return item.label === initialData.category;
  });

 const formattedReservations = initialData.reservations.map((item) => ({
    startDate: new Date(item?.startDate),
    endDate: new Date(item?.endDate),
  }));

  return (
    <>
      <ListingInfo 
        category={category} 
        description={initialData.description}
        roomCount={initialData.roomCount}
        bathroomCount={initialData.bathroomCount}
        guestCount={initialData.guestCount}
        userName={initialData.userName}
        userImg={initialData.userImg}
      />

      <ListingReservation
        listingId={initialData.listingId}
        price={initialData.price}
        reservations={formattedReservations}
      />
    </>
  );
}
