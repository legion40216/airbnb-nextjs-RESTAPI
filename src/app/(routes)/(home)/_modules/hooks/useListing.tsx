import { Listing } from "@/generated/prisma";
import { SearchFormValues } from "@/schemas";
import { useQuery } from "@tanstack/react-query";

export const useListings = (
  params: Partial<SearchFormValues>,
  initialData?: Listing[]
) => {
  return useQuery({
    queryKey: ["listings", params],
    queryFn: () => fetchListings(params),
    initialData,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

const fetchListings = async (params: Partial<SearchFormValues>) => {
  // Build the query string for the API
  // params currently is in the form of object we need to make it a query string
  const query = new URLSearchParams();
  // Filter out undefined values
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) 
    query.set(key, String(value));
  });

  const res = await fetch(`/api/listings?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};