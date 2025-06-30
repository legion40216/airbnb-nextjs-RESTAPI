import { Listing, User } from "@/generated/prisma";
import { currentUser } from "@/hooks/server-auth-utils";
import prisma from "@/lib/prismadb";

export type ListingWithRelations = {
  user: User;
  listing: Listing & {
    isFavorited: boolean;
  };
};

export type PropertiesError =
  | { type: "UNAUTHORIZED"; message: string }
  | { type: "DATABASE_ERROR"; message: string }
  | { type: "UNKNOWN_ERROR"; message: string };

export default async function getProperties(): Promise<
  { properties: ListingWithRelations[] } | { error: PropertiesError }
> {
  try {
    // Auth check
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return {
        error: {
          type: "UNAUTHORIZED",
          message: "Please log in to view properties",
        },
      };
    }

    // Fetch listings and only check if this user has favorited their own listing
    const listings = await prisma.listing.findMany({
      where: { userId },
      include: {
        favouritedBy: {
          where: {
            userId, // Only include current user's favorite record, if it exists
          },
          select: {
            id: true,
          },
        },
        user: true,
      },
    });

    const properties: ListingWithRelations[] = listings.map((listing) => ({
      user: listing.user,
      listing: {
        ...listing,
        isFavorited: listing.favouritedBy.length > 0,
        user: undefined,
        favouritedBy: undefined
      },
    }));

    return { properties };
  } catch (error) {
    console.error("Error fetching listings:", error);

    return {
      error: {
        type: "DATABASE_ERROR",
        message: "Unable to fetch properties at this time",
      },
    };
  }
}
