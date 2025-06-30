import { Prisma } from "@/generated/prisma";
import { currentUser } from "@/hooks/server-auth-utils";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ reservationId: string }> }
): Promise<Response> {
  try {
    // 1. Authenticate user
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reservationId } = await params;

    // Check if reservation exists and user owns it
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      select: {
        id: true,
        userId: true,
        startDate: true,
      },
    });
    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }
    // Check if the reservation belongs to the user
    // This is important to prevent unauthorized deletion
    if (reservation.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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
          { error: "Reservation not found" },
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
