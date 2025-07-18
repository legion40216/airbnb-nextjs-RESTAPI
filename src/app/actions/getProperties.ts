import { Prisma } from "@/generated/prisma";
import { currentUser } from "@/hooks/server-auth-utils";
import prisma from "@/lib/prismadb";

// Use Prisma's GetPayload to get the exact type from your query
type ListingWithUser = Prisma.ListingGetPayload<{
  include: {
    favouritedBy: {
      select: {
        id: true;
      };
    };
    user: true;
  };
}>;

// Define the transformed type with isFavorited flag
export type PropertyWithFavoriteFlag = {
  user: ListingWithUser['user'];
  listing: Omit<ListingWithUser, 'user' | 'favouritedBy'> & {
    isFavorited: boolean;
  };
};

export type PropertiesError =
  | { type: "UNAUTHORIZED"; message: string }
  | { type: "DATABASE_ERROR"; message: string }
  | { type: "UNKNOWN_ERROR"; message: string };

export default async function getProperties(): Promise<
  { properties: PropertyWithFavoriteFlag[] } | { error: PropertiesError }
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

    const properties: PropertyWithFavoriteFlag[] = listings.map((listing) => ({
      user: listing.user,
      listing: {
        ...listing,
        isFavorited: listing.favouritedBy.length > 0,
        user: undefined,
        favouritedBy: undefined,
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