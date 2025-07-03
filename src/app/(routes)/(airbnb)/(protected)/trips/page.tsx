import React from "react";
import { currentUser } from "@/hooks/server-auth-utils";
import { formatter } from "@/utils/formatters";
import useCountries from "@/hooks/useCountries";

import EmptyState from "@/components/global-ui/empty-state";
import TripsSection from "./_modules/sections/trips-section";
import getTrips from "@/app/actions/getTripsListing";
import { format } from "date-fns";

export default async function page() {
  // Get current user
  const user = await currentUser();
  const userId = user?.id;

  // Authorization
  if (!userId) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please log in to view your trips."
      />
    );
  }

  // Fetch reservations
  const result = await getTrips();

  // Handle error case
  if ("error" in result) {
    const { error } = result;
    switch (error.type) {
      case "UNAUTHORIZED":
        return (
          <EmptyState
            title="Authentication Required"
            subtitle={error.message}
          />
        );
      case "DATABASE_ERROR":
      case "UNKNOWN_ERROR":
      default:
        return (
          <EmptyState
            title="Unable to Load Trips"
            subtitle="We're experiencing technical difficulties. Please try again later."
          />
        );
    }
  }

  const { trips } = result;

  if (trips.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="You have no trips on your properties."
      />
    );
  }

  const { getByValue } = useCountries();
  const formattedListings = trips.map((item) => {
    const country = getByValue(item.listing.locationValue);
    const reservationDate = `${format(
      new Date(item.startDate),
      "MMM d, yyyy"
    )} – ${format(new Date(item.endDate), "MMM d, yyyy")}`;

    return {
      id: item.id,
      listingId: item.listing.id,
      locationRegion: country?.region || "",
      locationLabel: country?.label || "",
      imgSrc: item.listing.imgSrc,
      category: item.listing.category,
      price: formatter.format(item.totalPrice),
      reservationDate,
      isFavoritedByCurrentUser: item.listing.isFavorited,
    };
  });

  return <TripsSection initialData={formattedListings} />;
}
