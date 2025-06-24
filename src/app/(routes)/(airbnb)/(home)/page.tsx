// app/page.tsx
import getListings from "@/app/actions/getListings";
import { getValidatedServerSearchParams } from "@/utils/parseSearchParams";

import Client from "./_modules/components/home/client";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const parsed = getValidatedServerSearchParams(resolvedParams);
  
  const listings = await getListings(parsed);

  // simulate loading
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return <Client initialData={listings} />;
}
