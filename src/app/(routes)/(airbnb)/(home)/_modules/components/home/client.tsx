"use client";
import { useEffect, useMemo, useRef } from "react";

import { Listing } from "@/generated/prisma";
import useCountries from "@/hooks/useCountries";
import { useListings } from "../../hooks/useListing";
import ListingLists from "./client/listing-list";
import { getValidatedClientSearchParams } from "@/utils/parseSearchParams";
import { useSearchParams } from "next/navigation";
import { formatter } from "@/utils/formatters";

import ListingListSkeleton from "@/components/global-ui/listing-list-skeleton";
import { checkSearchParams } from "@/utils/checkSearchParams";
import EmptyState from "@/components/global-ui/empty-state";
import RemoveFilterBtn from "@/components/global-ui/airbnb-buttons/remove-filter-btn";

type ListingsListProps = {
  initialData: Listing[];
};

export default function Client({ initialData }: ListingsListProps) {
  // const rawParams = useSearchParams();

  // // Get params
  // const params = useMemo(() => {
  //   const validatedParams = getValidatedClientSearchParams(rawParams);
  //   return validatedParams;
  // }, [rawParams]);

  // // Handle initial data
  // const shouldUseInitialData = useRef(true);
  // useEffect(() => {
  //   shouldUseInitialData.current = false;
  // }, []);

  // // Fetch listings
  // const { data, isLoading, isFetching, error } = useListings(
  //   params,
  //   shouldUseInitialData.current ? initialData : undefined
  // );

  // // Render
  // if (!data && isLoading) return <ListingListSkeleton />;
  // if (isFetching) return <ListingListSkeleton />;
  // if (error) return <div>Error: {error.message}</div>;

  // Get countries
  const { getByValue } = useCountries();
  // Format data
  const formattedListings = initialData?.map((item: Listing) => ({
    id: item.id,
    locationRegion: getByValue(item.locationValue)?.region || "",
    locationLabel: getByValue(item.locationValue)?.label || "",
    imgSrc: item.imgSrc,
    category: item.category,
    price: formatter.format(Number(item.price)),
  }));


  // If no listings are found, show remove filter button
  const hasQuery = checkSearchParams();
  if (hasQuery && formattedListings?.length === 0) {
    return (
      <EmptyState>
        <RemoveFilterBtn />
      </EmptyState>
    );
  } else if (formattedListings?.length === 0) {
    return (
      <EmptyState
        title="No listings found"
        subtitle="Try adjusting your search criteria or removing filters."
      />
    );
  }

  return (
    <>
      <ListingLists data={formattedListings ?? []} />
    </>
  );
}
