'use client';
import { Heart } from 'lucide-react';

import { useAuthModalStore } from '@/hooks/useAuthModalStore';
import { useCurrentUser } from '@/hooks/client-auth-utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useFavorite } from '@/hooks/useFavorite';
import { Button } from '../ui/button';

type HeartButtonProps = {
  listingId: string;
  isFavoritedByCurrentUser?: boolean;
};

export default function HeartButton({ listingId, isFavoritedByCurrentUser }: HeartButtonProps) {
  const { user, isPending: isUserLoading } = useCurrentUser();
  const modalAuthSwitcher = useAuthModalStore();

  // Determine if the user is logged in
  const isLoggedIn = !!user

  // Fetch favorite status only if not provided
  // This avoids hydration mismatch issues when isFavoritedByCurrentUser is already known
  const { data, isLoading: favoritesLoading, isFetching } = useQuery({
    queryKey: ['favorites', listingId],
    queryFn: async () => {
      const response = await axios.get(`/api/favorites/${listingId}`);
      return response.data as { isFavorited: boolean };
    },
    // Remove initialData to prevent hydration mismatch
    enabled: isLoggedIn && isFavoritedByCurrentUser === undefined,
    staleTime: 60 * 1000,
  });

  // Use the provided isFavoritedByCurrentUser if available
  // This allows the button to render correctly during SSR without fetching
  const isFavorited = data?.isFavorited ?? isFavoritedByCurrentUser ?? false;

  // Determine loading state
  // We consider the button loading if:
  const isQueryLoading = favoritesLoading || isFetching;

  // If the user is logged in, we can toggle favorite status
  // Use the custom hook to handle favorite toggling
  const { toggleFavorite, toggleIsLoading } = useFavorite({ listingId, isFavorited });

  // Determine overall loading state
  // The button should show loading state if:
  const isLoading = isQueryLoading || toggleIsLoading || isUserLoading;

  // Handle click event
  // If the user is not logged in, open the login modal
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      modalAuthSwitcher.openModal("login");
    } else {
      toggleFavorite();
    }
  };

  
  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      size="icon"
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="size-6 border-2 border-neutral-300 border-t-neutral-500 rounded-full animate-spin" />
      ) : (
        <Heart
          className="size-8"
          fill={isLoggedIn && isFavorited ? "#f43f5e" : "rgb(115 115 115 / 0.7)"}
          stroke={isLoggedIn && isFavorited ? "#f43f5e" : "white"}
        />
      )}
    </Button>
  );
}