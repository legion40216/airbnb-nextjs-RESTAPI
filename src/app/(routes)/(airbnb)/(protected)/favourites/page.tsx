import React from 'react'

import getFavouritesListing from '@/app/actions/getFavouritesListing';
import { currentUser } from '@/hooks/server-auth-utils';
import useCountries from '@/hooks/useCountries';
import { formatter } from '@/utils/formatters';

import EmptyState from '@/components/global-ui/empty-state';
import FavourtiesSection from './_modules/sections/favourites-section';

export default async function Page() {
    // Get current user
    const user = await currentUser();
    const userId = user?.id;

    // Authorization
    if (!userId) {
    return (
        <EmptyState 
        title="Unauthorized"
        subtitle="Please log in to view your reservations."
        />
    );
    }

    // Fetch reservations
    const result = await getFavouritesListing();

    // Handle error case
    if ("error" in result) {
      const { error } = result;
      switch (error.type) {
        case 'UNAUTHORIZED':
          return (
            <EmptyState 
              title="Authentication Required" 
              subtitle={error.message}
            />
          );
        case 'DATABASE_ERROR':
        case 'UNKNOWN_ERROR':
        default:
          return (
            <EmptyState 
              title="Unable to Load Reservations" 
              subtitle="We're experiencing technical difficulties. Please try again later."
            />
          );
      }
    }



  const { favourites } = result;


  if (favourites.length === 0) {
    return (
      <EmptyState 
      title="No favourites found" 
      subtitle="You have no favourites." 
      />
    );
  }

  console.log('Favourites:', favourites);

  const { getByValue } = useCountries();
  const formattedListings = favourites.map((item) => {
    const country = getByValue(item.listing.locationValue);
    return {
      id: item.listing.id,
      locationRegion: country?.region || '',
      locationLabel: country?.label || '',
      imgSrc: item.listing.imgSrc,
      category: item.listing.category,
      price: formatter.format(item.listing.price),
      isFavoritedByCurrentUser: item.isFavorited,
    };
  });

  return (
    <FavourtiesSection formattedListings={formattedListings}/>
  )
}
