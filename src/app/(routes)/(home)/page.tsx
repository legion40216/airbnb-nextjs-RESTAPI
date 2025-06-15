// app/page.tsx
import getListings from '@/app/actions/getListings';
import Client from './_modules/components/home/client';
import { searchSchema } from '@/schemas';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const parsed = searchSchema.safeParse(resolvedParams);

    const listings = await getListings(parsed.success ? parsed.data : {});

    // simulate loading
    await new Promise(resolve => setTimeout(resolve, 5000));

    return (
    <Client initialData={listings} />
  )
}


