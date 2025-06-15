"use client";

import useCountries from "@/hooks/useCountries"; // Actual hook now
import { useListings } from "../../hooks/useListing";
import ListingLists from "./client/listing-list";
import { Listing } from "@/generated/prisma";
import { useSearchParams } from "next/navigation";
import { searchSchema } from "@/schemas";
import { useEffect, useMemo, useRef } from "react";
import ListingListSkeleton from "./components/listing-list-skeleton";
import { formatter } from "@/utils/formatters";

type ListingsListProps = {
initialData: Listing[];
};

export default function ListingsPage({ initialData }: ListingsListProps) {
  const rawParams = useSearchParams();
  const params = useMemo(() => {
    const parsed = searchSchema.safeParse({
      locationValue: rawParams.get("locationValue") || undefined,
      guestCount: rawParams.get("guestCount") ? Number(rawParams.get("guestCount")) : undefined,
      roomCount: rawParams.get("roomCount") ? Number(rawParams.get("roomCount")) : undefined,
      bathroomCount: rawParams.get("bathroomCount") ? Number(rawParams.get("bathroomCount")) : undefined,
      startDate: rawParams.get("startDate") || undefined,
      endDate: rawParams.get("endDate") || undefined,
      category: rawParams.get("category") || undefined,
    });
    return parsed.success ? parsed.data : {};
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