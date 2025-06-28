import { Listing, Reservation, User, Favourite } from "@/generated/prisma";
import { currentUser } from "@/hooks/server-auth-utils";
import prisma from "@/lib/prismadb";

// Type for the complete reservation with relations
// This type includes the reservation itself, user information, listing details, and favouritedBy relations
export type ListingWithRelations = Reservation & {
  user: User;
  listing: Listing & {
    favouritedBy: Favourite[];
  };
};

// This type is used to handle different error scenarios when fetching a listing by ID
export type ReservationError =
  | { type: "UNAUTHORIZED"; message: string }
  | { type: "DATABASE_ERROR"; message: string }
  | { type: "UNKNOWN_ERROR"; message: string };

export default async function getReservations(): Promise<
  { reservations: ListingWithRelations[] } | { error: ReservationError }
> {
  try {
    // Check if user is authenticated
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return {
        error: {
          type: "UNAUTHORIZED",
          message: "Please log in to view reservations",
        },
      };
    }

    // Fetch reservations with user and listing details
    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: {
        listing: {
          include: {
            favouritedBy: true,
          },
        },
        user: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return { reservations };
  } catch (error) {
    console.error("Error fetching reservations:", error); // Log the actual error for debugging

    return {
      error: {
        type: "DATABASE_ERROR",
        message: "Unable to fetch reservations at this time",
      },
    };
  }
}
