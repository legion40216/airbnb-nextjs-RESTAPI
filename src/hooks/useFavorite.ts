// hooks/useFavorite.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

interface UseFavoriteProps {
  listingId: string;
  isFavorited: boolean;
}

export function useFavorite({ listingId, isFavorited }: UseFavoriteProps) {
  const queryClient = useQueryClient();

  // Mutation to toggle favorite
  const mutation = useMutation({
    // Mutation function
    mutationFn: async () => {
      const loadingMsg = isFavorited
        ? "Removing from favorites..."
        : "Adding to favorites...";
      
      const toastId = toast.loading(loadingMsg);
      
      try {
        const response = await axios.post(`/api/favorites/${listingId}`);
        return response.data;
      } finally {
        toast.dismiss(toastId);
      }
    },
    // Optimistic update
    onMutate: async () => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['favorites', listingId] });
      
      const previousData = queryClient.getQueryData(['favorites', listingId]);
      
      queryClient.setQueryData(['favorites', listingId], (old: { isFavorited: boolean }) => ({
        isFavorited: !old.isFavorited,
      }));

      return { previousData };
    },
    // Success
    onSuccess: (data) => {
      const successMessage = data.isFavorited
        ? "Added to favorites"
        : "Removed from favorites";
      
      toast.success(successMessage);
    },
    // Rollback on error
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(['favorites', listingId], context.previousData);
      }
      
      toast.error(error.message || "Something went wrong");
    },
    // Refetch after mutation
    onSettled: () => {
      // Refetch after mutation to ensure server state matches client
      queryClient.invalidateQueries({ queryKey: ['favorites', listingId] });
    },
  });

  return {
    toggleFavorite: mutation.mutate,
    toggleIsLoading: mutation.isPending,
  };
}