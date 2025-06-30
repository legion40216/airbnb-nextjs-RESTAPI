'use client';

import { useRouter } from "next/navigation";
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useFavorite } from '@/hooks/useFavorite';
import { useAuthModalStore } from '@/hooks/useAuthModalStore';
import { useCurrentUser } from '@/hooks/client-auth-utils';

type Props = {
  listingId: string;
  isFavoritedByCurrentUser: boolean;
};

export default function HeartButtonWithRefresh({ listingId, isFavoritedByCurrentUser }: Props) {
  const router = useRouter();
  const modalAuthSwitcher = useAuthModalStore();
  const { user, isPending: isUserLoading } = useCurrentUser();

  const isLoggedIn = !!user;
  const { toggleFavorite, toggleIsLoading } = useFavorite({
    listingId,
    isFavorited: isFavoritedByCurrentUser,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      modalAuthSwitcher.openModal("login");
    } else {
      toggleFavorite(undefined, {
        onSettled: () => {
          router.refresh(); // Refresh the page (or at least re-run server component logic)
        },
      });
    }
  };

  const isLoading = toggleIsLoading || isUserLoading;

  return (
    <Button variant="ghost" onClick={handleClick} size="icon" disabled={isLoading}>
      {isLoading ? (
        <div className="size-6 border-2 border-neutral-300 border-t-neutral-500 rounded-full animate-spin" />
      ) : (
        <Heart
          className="size-8"
          fill={isLoggedIn && isFavoritedByCurrentUser ? "#f43f5e" : "rgb(115 115 115 / 0.7)"}
          stroke={isLoggedIn && isFavoritedByCurrentUser ? "#f43f5e" : "white"}
        />
      )}
    </Button>
  );
}
