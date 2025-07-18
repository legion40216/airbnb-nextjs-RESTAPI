import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

import { currentUser } from "@/hooks/server-auth-utils";

import { z } from 'zod';
// Zod schema for UUID validation
const listingIdSchema = z.string().uuid();

export async function POST(
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

    // 2. Await params
    const { listingId: rawListingId } = await params;

    // 3. Validate listingId with Zod
    const validation = listingIdSchema.safeParse(rawListingId);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid listing ID format' },
        { status: 400 }
      );
    }
    const listingId = validation.data;

    // 4. Check if listingId exists
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });
    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // 5. Check if favorite already exists
    const existingFavorite = await prisma.favourite.findFirst({
      where: {
        userId,
        listingId,
      },
    });

    // 6. Add or remove favorite
    if (existingFavorite) {
      // Remove favorite
      await prisma.favourite.delete({
        where: {
          id: existingFavorite.id,
        },
      });
      return NextResponse.json({ isFavorited: false });
    } else {
      // Add favorite
      await prisma.favourite.create({
        data: {
          userId,
          listingId,
        },
      });

      return NextResponse.json({ isFavorited: true });
    }

  } catch (error) {
    console.error("[favorites_POST]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(
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

    // 2. Await params and validate listingId with Zod
    const { listingId: rawListingId } = await params;
    const validation = listingIdSchema.safeParse(rawListingId);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid listing ID format' },
        { status: 400 }
      );
    }
    const listingId = validation.data;

    // 3. Check if favorite exists
    const favorite = await prisma.favourite.findFirst({
      where: {
        userId,
        listingId,
      },
    });

    // If favorite exists, return true, otherwise false
    return NextResponse.json({ isFavorited: !!favorite });
  } catch (error) {
    console.error("[favorites_GET]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}