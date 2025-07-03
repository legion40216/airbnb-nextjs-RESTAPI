import { Prisma } from "@/generated/prisma";
import { currentUser } from "@/hooks/server-auth-utils";
import prisma from "@/lib/prismadb";

// This type is used to handle different error scenarios when fetching a listing by ID
export type TripsError =
  | { type: "UNAUTHORIZED"; message: string }
  | { type: "DATABASE_ERROR"; message: string }
  | { type: "UNKNOWN_ERROR"; message: string };

// Define the type for reservation with listing and transformed favorite flag
type ReservationWithListing = Prisma.ReservationGetPayload<{
  include: {
    listing: {
      include: {
        images: true;
        favouritedBy: {
          select: {
            id: true;
          };
        };
      };
    };
  };
}>;

// Define the transformed type with isFavorited flag
export type TripWithFavoriteFlag = Omit<ReservationWithListing, 'listing'> & {
  listing: Omit<ReservationWithListing['listing'], 'favouritedBy'> & {
    isFavorited: boolean;
  };
};

export default async function getTrips(): Promise<
  { trips: TripWithFavoriteFlag[] } | { error: TripsError }
> {
  try {
    // Check if user is authenticated
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return {
        error: {
          type: "UNAUTHORIZED",
          message: "Please log in to view trips",
        },
      };
    }

    // Fetch reservations with user and listing details
    const reservations = await prisma.reservation.findMany({
      where: {
        userId,
      },
      include: {
        listing: {
          include: {
            images: true,
            favouritedBy: {
              where: {
                userId,
              },
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const reservationsWithFavoriteFlag: TripWithFavoriteFlag[] = reservations.map((res) => ({
      ...res,
      listing: {
        ...res.listing,
        isFavorited: res.listing.favouritedBy.length > 0,
        favouritedBy: undefined,
      },
    }));

    return { trips: reservationsWithFavoriteFlag };
  } catch (error) {
    console.error("Error fetching trips:", error); // Log the actual error for debugging

    return {
      error: {
        type: "DATABASE_ERROR",
        message: "Unable to fetch trips at this time",
      },
    };
  }
}