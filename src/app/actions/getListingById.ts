// app/actions/getListings.ts
import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prismadb";
import { z } from "zod";

// Use Prisma's GetPayload to automatically generate the correct type
// This ensures type safety and matches exactly what your query returns
export type ListingWithRelations = Prisma.ListingGetPayload<{
  include: {
    user: true;
    images: true;
    reservations: true;
  };
}>;

// This type is used to handle different error scenarios when fetching a listing by ID
export type ListingsByIdError =
  | { type: "DATABASE_ERROR"; message: string }
  | { type: "UNKNOWN_ERROR"; message: string };

// Zod schema for UUID validation
const listingIdSchema = z.string().uuid();

export default async function getListingById(params: {
  listingId: string;
}): Promise<
  { listing: ListingWithRelations | null } | { error: ListingsByIdError }
> {
  try {
    // No need to await params here since it's already resolved in the page component
    const { listingId } = params;

    // validate listingId with Zod
    const validation = listingIdSchema.safeParse(listingId);
    if (!validation.success) {
      // throw error
      return {
        error: {
          type: "UNKNOWN_ERROR",
          message: "Invalid listing ID format",
        },
      };
    }
    const validatedListingId = validation.data;

    // Fetch the listing with relations
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

    // If listing is not found, return null
    if (!listing) {
      return { listing: null };
    }

    return { listing };
  } catch (error) {
    console.error("Error fetching listing:", error); // Log the actual error for debugging

    return {
      error: {
        type: "DATABASE_ERROR",
        message: "Unable to fetch listing at this time",
      },
    };
  }
}