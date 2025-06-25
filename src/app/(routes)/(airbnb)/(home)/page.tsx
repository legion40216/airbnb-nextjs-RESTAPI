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
  if ('error' in result) {
    return <EmptyState title="Error loading listings" subtitle={result.error} />
  }

  const { listings } = result;

  return <Client initialData={listings} />;
}