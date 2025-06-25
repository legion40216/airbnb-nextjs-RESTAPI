// app/actions/getListings.ts
import { Listing, ListingImages, Reservation, User } from "@/generated/prisma";
import prisma from "@/lib/prismadb";
import { z } from 'zod';

export type ListingWithRelations = Listing & {
  user: User;
  images: ListingImages[];
  reservations: Reservation[];
};

// Zod schema for UUID validation
const listingIdSchema = z.string().uuid();

export default async function getListingById(
  params: { listingId: string }
): Promise<{ listing: ListingWithRelations | null } | { error: string }> {
  try {
    // No need to await params here since it's already resolved in the page component
    const { listingId } = params;

    // validate listingId with Zod
    const validation = listingIdSchema.safeParse(listingId);
    if (!validation.success) {
      // throw error
      return { error: 'Invalid listing ID format' };
    }
    
    const validatedListingId = validation.data;

    const listing = await prisma.listing.findUnique({
      where: {
        id: validatedListingId,
      },
      include: {
        user: true,
        images: true,
        reservations: true,
      },
    });

    if (!listing) {
      return { listing: null };
    }

    return { listing };

  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch listings");
  }
}