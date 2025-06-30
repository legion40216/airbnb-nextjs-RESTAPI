import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

interface UseFavoriteProps {
  listingId: string;
  isFavorited: boolean;
}

export function useFavorite({ listingId, isFavorited }: UseFavoriteProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const toastId = toast.loading(
        isFavorited ? "Removing from favorites..." : "Adding to favorites..."
      );

      try {
        const response = await axios.post(`/api/favorites/${listingId}`);
        return response.data; // Should return { isFavorited: boolean }
      } finally {
        toast.dismiss(toastId);
      }
    },

    // ✅ Optimistic update
    onMutate: async () => {
      // Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: ['favourites'] });

      // Snapshot previous state
      const previousFavourites = queryClient.getQueryData<any[]>(['favourites']);

      // Optimistically update cache
      queryClient.setQueryData(['favourites'], (old: any[] | undefined) => {
        if (!old) return [];

        if (isFavorited) {
          // Remove listing from favourites (optimistically)
          return old.filter((fav) => fav.listing.id !== listingId);
        } else {
          // Add dummy listing data (or leave it and wait for refetch)
          return old;
        }
      });

      return { previousFavourites };
    },

    // ✅ Error rollback
    onError: (error, _vars, context) => {
      if (context?.previousFavourites) {
        queryClient.setQueryData(['favourites'], context.previousFavourites);
      }
      toast.error(error.message || "Something went wrong");
    },

    // ✅ Ensure fresh data
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
      queryClient.invalidateQueries({ queryKey: ['favorites', listingId] }); // if you have this
    },

    // ✅ Success toast
    onSuccess: (data) => {
      toast.success(
        data.isFavorited ? "Added to favorites" : "Removed from favorites"
      );
    },
  });

  return {
    toggleFavorite: mutation.mutate,
    toggleIsLoading: mutation.isPending,
  };
}
