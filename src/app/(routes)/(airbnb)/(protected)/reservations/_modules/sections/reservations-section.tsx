import React from "react";
import ReservationsList from "../components/reservations-list";
import Headings from "@/components/global-ui/headings";

type ReservationsSectionProps = {
  initialData: {
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
};

export default function ReservationsSection({
  initialData,
}: ReservationsSectionProps) {
  return (
    <div className="space-y-4">
      <Headings title="Reservations" subtitle="List of your reservations" />

      <div>
        <ReservationsList data={initialData} />
      </div>
    </div>
  );
}
