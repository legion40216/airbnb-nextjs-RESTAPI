import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { currentUser } from "@/hooks/server-auth-utils";

import getListings from "@/app/actions/getListings";
import { getValidatedServerSearchParams } from "@/utils/parseSearchParams";
import { ListingSchema } from "@/schemas";

export async function POST(request: Request) {
  try {
    // 1. Authenticate user
    const user = await currentUser()
    const userId = user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    //Validate data and parse data
    const validatedFields = ListingSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Extract data
    const { 
      title,
      description,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue,
      price,
      images,
      imgSrc
     } = validatedFields.data;

    // 4. Create
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue,
        price,
        userId,
        images: {
          create:
            images?.map((img) => ({
              url: img.url,
            })) ?? [],
        },
        imgSrc: imgSrc || "",
      },
    });

    return NextResponse.json(
      { success: true, 
        listing,
        message: "Listing created successfully" 
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("[listings_POST]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  // Get query params
  const url = new URL(request.url);
  const rawParams = Object.fromEntries(url.searchParams.entries());

  // Safe parse
  const parsedParams = getValidatedServerSearchParams(rawParams);

try {
    const result = await getListings(parsedParams);
    
    // Handle the union type properly
    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
    
    // Return just the listings array, not the wrapper object
    return NextResponse.json(result.listings);
    
  } catch (error) {
    console.error("[listings_GET]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}


