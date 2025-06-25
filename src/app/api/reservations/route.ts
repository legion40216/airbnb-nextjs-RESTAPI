import prisma from "@/lib/prismadb";
import { currentUser } from "@/hooks/server-auth-utils";
import { reservationServerSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Authenticate user
    const user = await currentUser()
    const userId = user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get body
    const body = await request.json();

    // 3.Validate data and parse data
    const validatedFields = reservationServerSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // 4. Extract data
    const { listingId, startDate, endDate, totalPrice } = validatedFields.data;

    // 5. Create reservation
    const reservation = await prisma.reservation.create({
      data: {
        startDate,
        endDate,
        totalPrice,
        userId,
        listingId,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Reservation created successfully" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[reservations_POST]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
