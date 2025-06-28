import getListings from "@/app/actions/getListings";
import { getValidatedServerSearchParams } from "@/utils/parseSearchParams";

import EmptyState from "@/components/global-ui/empty-state";
import Client from "./_modules/components/home/client";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const parsed = getValidatedServerSearchParams(resolvedParams);
  
  const result = await getListings(parsed);

  // Handle error case
 if ("error" in result) {
    const { error } = result;
    switch (error.type) {
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

  const { listings } = result;

  return <Client initialData={listings} />;
}