import { Prisma } from "@/generated/prisma";
import { currentUser } from "@/hooks/server-auth-utils";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ reservationId: string }> }
): Promise<NextResponse> {
  try {
    // 1. Authenticate user
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reservationId } = await params;

    // Check if reservation exists and get both guest and host info
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      select: {
        id: true,
        userId: true,
        startDate: true,
        listing: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    // Check if user has permission to delete (either guest or host)
    const isGuest = reservation.userId === userId;
    const isHost = reservation.listing.userId === userId;

    if (!isGuest && !isHost) {
      return NextResponse.json(
        { error: "You do not have permission to delete this reservation" },
        { status: 403 }
      );
    }

    const deletedReservation = await prisma.reservation.delete({
      where: { id: reservationId },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Reservation deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle unexpected errors
    console.error("[reservations_DELETE]", error);

    // Re-throw Prisma errors as NextResponse errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Reservation not found or already deleted" },
          { status: 404 }
        );
      }
    }
    // Handle other errors
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}