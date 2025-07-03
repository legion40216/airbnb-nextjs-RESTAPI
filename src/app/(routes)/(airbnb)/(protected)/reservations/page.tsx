import React from 'react';
import getReservations from '@/app/actions/getReservations';
import { currentUser } from '@/hooks/server-auth-utils';
import useCountries from '@/hooks/useCountries';
import { formatter } from '@/utils/formatters';
import { format } from 'date-fns';
import EmptyState from '@/components/global-ui/empty-state';
import ReservationsSection from './_modules/sections/reservations-section';

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
  const result = await getReservations();

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

  // Extract reservations from the result
  const { reservations } = result;

  // Handle no reservations case
  if (reservations.length === 0) {
    return (
      <EmptyState 
        title="No reservations found" 
        subtitle="You have no reservations on your properties." 
      />
    );
  }

  // Use countries hook to get country details
  const { getByValue } = useCountries();

  // Map through reservations to format them
  const formattedListings = reservations.map((item) => {
    // Get country details from the locationValue
    const country = getByValue(item.listing.locationValue);
    // Format reservation date
    const reservationDate = `${format(new Date(item.startDate), "MMM d, yyyy")} – ${format(new Date(item.endDate), "MMM d, yyyy")}`;
    // Check if the current user favorited this listing
    const isFavoritedByCurrentUser = item.listing.favouritedBy.length > 0;
    
    return {
      id:               item.id,
      listingId:        item.listing.id,
      locationRegion:   country?.region || "",
      locationLabel:    country?.label || "",
      imgSrc:           item.listing.imgSrc,
      category:         item.listing.category,
      price:            formatter.format(item.totalPrice),
      reservationDate:  reservationDate,
      reservedBy:       item.user.name || item.user.email || 'Unknown user',
      isFavoritedByCurrentUser,
    };
  });

  return (
    <ReservationsSection initialData={formattedListings}/>
  );
}