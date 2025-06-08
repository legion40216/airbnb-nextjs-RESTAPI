// hooks/useFavorite.ts
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';

interface UseFavoriteProps {
  listingId: string;
}

const useFavorite = ({ listingId }: UseFavoriteProps) => {
  const utils = trpc.useUtils();

  // Use the trpc.favourites.toggle mutation
  const mutation = trpc.favourites.toggle.useMutation({
    onSuccess: (data) => {
      // Invalidate the query that fetches user favourites
      utils.favourites.getUserFavouritesById.invalidate();
      
      const successMessage = data.status === 'removed' 
        ? 'Removed from favorites' 
        : 'Added to favorites';
      toast.success(successMessage);
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong.');
    },
  });

  // Toggle favorite
  const toggleFavorite = () => {
    mutation.mutate({ listingId });
  };

  return {
    toggleFavorite,
    isLoading: mutation.isPending,
  };
};

export default useFavorite;