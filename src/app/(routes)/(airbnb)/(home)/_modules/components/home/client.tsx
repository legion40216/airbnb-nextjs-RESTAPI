"use client";

import useCountries from "@/hooks/useCountries"; // Actual hook now
import { useListings } from "../../hooks/useListing";
import ListingLists from "./client/listing-list";
import { Listing } from "@/generated/prisma";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

import { formatter } from "@/utils/formatters";
import ListingListSkeleton from "@/components/global-ui/listing-list-skeleton";
import { getValidatedClientSearchParams } from "@/utils/parseSearchParams";

type ListingsListProps = {
initialData: Listing[];
};

export default function ListingsPage({ initialData }: ListingsListProps) {
  const rawParams = useSearchParams();
  const params = useMemo(() => {
    const validdatedParams = getValidatedClientSearchParams(rawParams)
    return validdatedParams;
  }, [rawParams]);

  const shouldUseInitialData = useRef(true);
  useEffect(() => {
  shouldUseInitialData.current = false;
  }, []);

  const { data, isLoading, isFetching, error } = useListings(
    params,
    shouldUseInitialData.current ? initialData : undefined
  );

  if (!data && isLoading) return <ListingListSkeleton />;
  if (isFetching) return <ListingListSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  const { getByValue } = useCountries()
  const formattedListings = data?.map((item: Listing) => ({
    id: item.id,
    locationRegion: getByValue(item.locationValue)?.region || '',
    locationLabel: getByValue(item.locationValue)?.label || '',
    imgSrc: item.imgSrc,
    category: item.category,
    price: formatter.format(Number(item.price)),
  })) || [];

  return (
    <>
      <ListingLists data={formattedListings} />
    </>
  );
}