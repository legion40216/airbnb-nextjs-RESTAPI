import getListings from "@/app/actions/getListings";
import { currentUser } from "@/hooks/server-auth-utils";
import prisma from "@/lib/prismadb";
import { ListingSchema, searchSchema } from "@/schemas";
import { NextResponse } from "next/server";

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
  const url = new URL(request.url);
  const rawParams = Object.fromEntries(url.searchParams.entries());

  // Safe parse
  const parsed = searchSchema.safeParse(rawParams);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid search parameters", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const params = parsed.data;

  try {
    const listings = await getListings(params);
    return NextResponse.json(listings);
  } catch (error) {
    console.error("[listings_GET]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
