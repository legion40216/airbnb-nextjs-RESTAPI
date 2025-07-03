// getReservations.ts
import { Prisma } from "@/generated/prisma";
import { currentUser } from "@/hooks/server-auth-utils";
import prisma from "@/lib/prismadb";

// Use Prisma's GetPayload to automatically generate the correct type
export type ReservationWithRelations = Prisma.ReservationGetPayload<{
  include: {
    listing: {
      include: {
        favouritedBy: {
          select: {
            id: true;
          };
        };
      };
    };
    user: true;
  };
}>;

// This type is used to handle different error scenarios when fetching reservations
export type ReservationError =
  | { type: "UNAUTHORIZED"; message: string }
  | { type: "DATABASE_ERROR"; message: string }
  | { type: "UNKNOWN_ERROR"; message: string };

export default async function getReservations(): Promise<
  { reservations: ReservationWithRelations[] } | { error: ReservationError }
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

    const reservations = await prisma.reservation.findMany({
      where: {
        listing: {
          userId: userId, // only fetch reservations on your listings
        },
      },
      include: {
        listing: {
          include: {
            favouritedBy: {
              where: {
                userId: userId, // only check if YOU favorited it
              },
              select: {
                id: true,
              },
            },
          },
        },
        user: true, // guest who made the reservation
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return { reservations };
  } catch (error) {
    console.error("Error fetching reservations:", error);

    return {
      error: {
        type: "DATABASE_ERROR",
        message: "Unable to fetch reservations at this time",
      },
    };
  }
}