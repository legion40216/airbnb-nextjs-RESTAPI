// app/actions/getListings.ts
import { Prisma, Listing } from "@/generated/prisma";
import prisma from "@/lib/prismadb";
import { SearchParamsValues } from "@/schemas";

// This type is used to handle different error scenarios when fetching a listing by ID
export type ListingsError =
  | { type: "DATABASE_ERROR"; message: string }
  | { type: "UNKNOWN_ERROR"; message: string };

export default async function getListings(
  params: SearchParamsValues
): Promise<{ listings: Listing[] } | { error: ListingsError }> {
  try {
    const {
      locationValue,
      guestCount,
      roomCount,
      bathroomCount,
      category,
      startDate,
      endDate,
    } = params;

    // 1. Build the Prisma query object with strict typing
    const query: Prisma.ListingWhereInput = {
      ...(category && { category }),
      ...(locationValue && { locationValue }),
      ...(guestCount && { guestCount: { gte: guestCount } }),
      ...(roomCount && { roomCount: { gte: roomCount } }),
      ...(bathroomCount && { bathroomCount: { gte: bathroomCount } }),
      ...(startDate &&
        endDate && {
          NOT: {
            reservations: {
              some: {
                OR: [
                  {
                    endDate: { gte: startDate },
                    startDate: { lte: startDate },
                  },
                  {
                    startDate: { lte: endDate },
                    endDate: { gte: endDate },
                  },
                ],
              },
            },
          },
        }),
    };
    
    // 2. Fetch listings
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
    });

    return { listings };
  } catch (error) {
    console.error("Error fetching listings:", error); // Log the actual error for debugging

    return {
      error: {
        type: "DATABASE_ERROR",
        message: "Unable to fetch listings at this time",
      },
    };
  }
}
