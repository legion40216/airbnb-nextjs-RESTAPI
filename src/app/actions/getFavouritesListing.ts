// app/actions/getListings.ts
import { Favourite, Listing } from "@/generated/prisma";
import { currentUser } from "@/hooks/server-auth-utils";
import prisma from "@/lib/prismadb";

type FavouriteWithRelations = Favourite & {
  listing: Listing;
  isFavorited: true;
};

export type FavouritesError =
  | { type: "UNAUTHORIZED"; message: string }
  | { type: "DATABASE_ERROR"; message: string }
  | { type: "UNKNOWN_ERROR"; message: string };

export default async function getFavouritesListing(): Promise<
  { favourites: FavouriteWithRelations[] } | { error: FavouritesError }
> {
  try {
  // Auth check
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return {
      error: {
        type: "UNAUTHORIZED",
        message: "Please log in to view properties",
      },
    };
  }

  const favourites = await prisma.favourite.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      listing: true, // includes all basic listing fields
    },
  });
  
  const favouritesWithStatus = favourites.map((fav) => ({
    ...fav,
    isFavorited: true as true, // ensure literal type 'true'
  }));

    return { favourites: favouritesWithStatus };
  } catch (error) {
    console.error("Error fetching Favourites:", error); // Log the actual error for debugging

    return {
      error: {
        type: "DATABASE_ERROR",
        message: "Unable to fetch Favourites at this time",
      },
    };
  }
}
