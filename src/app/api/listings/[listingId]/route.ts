import { Prisma } from "@/generated/prisma";
import { currentUser } from "@/hooks/server-auth-utils";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ listingId: string }> }
): Promise<Response> {
  try {
    // 1. Authenticate user
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Extract listingId from params
    const { listingId } = await params;

    // 3. Check if the listing exists and belongs to the user
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
        userId: userId,
      },
    });
    if (!listing) {
      return NextResponse.json(
        { error: "Listing not found or does not belong to the user." },
        { status: 404 }
      );
    }

    // 4. Check if the listingId is provided in the request body
    if (listing.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 5. Delete the listing
    const deletedProperty = await prisma.listing.delete({
      where: { id: listingId },
    });

    // 6. Return success response
    return NextResponse.json(
      { success: true, message: "Property deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[listing_DELETE]", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Listings not found within this store." },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
