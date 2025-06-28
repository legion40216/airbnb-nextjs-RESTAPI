import { Listing } from "@/generated/prisma";
import { SearchParamsValues } from "@/schemas";
import { useQuery } from "@tanstack/react-query";

export const useListings = (
  params: SearchParamsValues,
  initialData?: Listing[]
) => {
  return useQuery<Listing[], Error>({
    queryKey: ["listings", params],
    queryFn: () => fetchListings(params),
    initialData,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

const fetchListings = async (params: SearchParamsValues): Promise<Listing[]> => {
  const query = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      query.set(key, String(value));
    }
  });

  const res = await fetch(`/api/listings?${query.toString()}`);
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch listings');
  }
  
  // This will now be properly typed as ListingWithFavorites[]
  return res.json();
};