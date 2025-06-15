// app/actions/getListings.ts
import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prismadb";
import { SearchFormValues } from "@/schemas";

export default async function getListings(
  params: Partial<SearchFormValues>
) {
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

    return listings;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch listings");
  }
}