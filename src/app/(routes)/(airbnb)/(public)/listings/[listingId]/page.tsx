// app/[listingId]/page.tsx
import React from "react";

import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/components/global-ui/empty-state";
import useCountries from "@/hooks/useCountries";

import SectionReservationInfo from "./_modules/sections/section-reservation-info";
import SectionBannerHeading from "./_modules/sections/section-banner-heading";

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  // Await params before using its properties
  const resolvedParams = await params;
  const result = await getListingById(resolvedParams);

  // Handle error case
 if ("error" in result) {
    const { error } = result;
    switch (error.type) {
      case 'DATABASE_ERROR':
      case 'UNKNOWN_ERROR':
      default:
        return (
          <EmptyState 
            title="Unable to fetch listing" 
            subtitle="We're experiencing technical difficulties. Please try again later."
          />
        );
    }
  }

  const { listing } = result;

  if (!listing) {
    return (
      <EmptyState
        title="Listing not found"
        subtitle="We couldn't find the listing you're looking for."
      />
    );
  }

  const { getByValue } = useCountries();
  const country = listing.locationValue
    ? getByValue(listing.locationValue)
    : null;

  const formattedListing = {
    listingId: listing.id,
    title: listing.title,
    description: listing.description,
    category: listing.category,
    roomCount: listing.roomCount,
    bathroomCount: listing.bathroomCount,
    guestCount: listing.guestCount,
    userName: listing.user.name,
    userImg: listing.user.image || "",
    locationRegion: country?.region,
    locationLabel: country?.label,
    price: listing.price || 0,
    imgSrc: listing.imgSrc,
  };

  // Ensure all necessary fields are present
  const bannerData = {
    title: formattedListing.title,
    locationRegion: formattedListing.locationRegion ?? "",
    locationLabel: formattedListing.locationLabel ?? "",
    listingId: formattedListing.listingId,
    imgSrc: formattedListing.imgSrc,
  };
  const reservationData = {
    listingId: formattedListing.listingId,
    category: formattedListing.category,
    price: formattedListing.price,
    description: formattedListing.description,
    roomCount: formattedListing.roomCount,
    bathroomCount: formattedListing.bathroomCount,
    guestCount: formattedListing.guestCount,
    userName: formattedListing.userName,
    userImg: formattedListing.userImg,
    reservations: listing.reservations, // Keep original reservations for date formatting
  };

  return (
    <div className="space-y-4">
      <SectionBannerHeading bannerData={bannerData} />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
        <SectionReservationInfo reservationData={reservationData} />
      </div>
    </div>
  );
}
