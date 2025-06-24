'use client';
import { Heart } from 'lucide-react';

import { useAuthModalStore } from '@/hooks/useAuthModalStore';
import { useCurrentUser } from '@/hooks/client-auth-utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Button } from '../../../../my-app/src/components/ui/button';
import { useFavorite } from '@/hooks/useFavorite';

type HeartButtonProps = {
  listingId: string;
};

export default function HeartButton({ listingId }: HeartButtonProps) {
  const { user, isPending: isUserLoading } = useCurrentUser();
  const modalAuthSwitcher = useAuthModalStore();

  const isLoggedIn = !!user && !isUserLoading;

  const { data, isLoading: favoritesLoading, isFetching } = useQuery({
    queryKey: ['favorites', listingId],
    queryFn: async () => {
      const response = await axios.get(`/api/favorites/${listingId}`);
      return response.data as { isFavorited: boolean };
    },
    // Remove initialData to prevent hydration mismatch
    enabled: isLoggedIn,
    staleTime: 60 * 1000,
  });

  // Safe fallback - handles undefined data gracefully
  const isFavorited = data?.isFavorited || false;
  const isQueryLoading = favoritesLoading || isFetching;

  const { toggleFavorite, toggleIsLoading } = useFavorite({ listingId, isFavorited });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      modalAuthSwitcher.openModal("login");
    } else {
      toggleFavorite();
    }
  };

  const isLoading = isUserLoading || isQueryLoading || toggleIsLoading;
  

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