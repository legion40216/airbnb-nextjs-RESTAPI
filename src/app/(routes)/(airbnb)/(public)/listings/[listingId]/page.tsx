// app/[listingId]/page.tsx
import React from 'react'

import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/components/global-ui/empty-state'
import useCountries from '@/hooks/useCountries';
import { categories } from '@/constants/categoryIcons';

import Headings from '@/components/global-ui/headings';
import ListingBanner from './_modules/components/listing-banner';
import ListingInfo from './_modules/components/listing-info';
import ListingReservation from './_modules/components/listing-reservation';

export default async function Page({params}: {params: Promise<{listingId: string}>}) {
  // Await params before using its properties
  const resolvedParams = await params;
  const result = await getListingById(resolvedParams);

  // Handle error case
  if ('error' in result) {
    return <EmptyState title="Error loading listings" subtitle={result.error} />
  }

  const { listing } = result;
  
  if (!listing) {
    return <EmptyState title="Listing not found" subtitle="We couldn't find the listing you're looking for." />
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
    userImg: listing.user.image || null,
    locationRegion: country?.region,
    locationLabel: country?.label,
    price: listing.price || 0,
    imgSrc: listing.imgSrc,
  };

  const subtitle = `${formattedListing.locationRegion}, ${formattedListing.locationLabel}`;

  const category = categories.find((item) => {
    return item.label === formattedListing.category;
  });

  const formattedReservations = listing.reservations.map((item) => ({
    startDate: new Date(item?.startDate),
    endDate: new Date(item?.endDate),
  }));

  return (
    <div className="space-y-4">
      <Headings 
      title={formattedListing.title} 
      subtitle={subtitle} 
      />

      <ListingBanner
        listingId={formattedListing.listingId}
        imgSrc={formattedListing.imgSrc}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
        <ListingInfo 
        category={category} 
        formattedListing={formattedListing} />

        <ListingReservation
          listingId={formattedListing.listingId}
          price={formattedListing.price}
          reservations={formattedReservations}
        />
      </div>
    </div>
  );
}