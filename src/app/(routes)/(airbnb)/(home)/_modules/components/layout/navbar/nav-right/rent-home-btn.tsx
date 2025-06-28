'use client';
import React from "react";
import { useAuthModalStore } from "@/hooks/useAuthModalStore";
import { useMultiModalStore } from "@/hooks/useMultiModalStore";
import { useCurrentUser } from "@/hooks/client-auth-utils";

import { Button } from "@/components/ui/button";

export default function RentHomeBtn() {
  const { user, isPending } = useCurrentUser();
  const { openModal } = useMultiModalStore();
  const { openModal: openAuthModal } = useAuthModalStore();

  const isLoggedIn = !!user // Convert user to boolean
  
  const handleClick = () => {
    if (isLoggedIn) {
      openModal("rent");
    } else {
      openAuthModal("login");
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="rounded-full"
      size="lg"
      disabled={isPending}
    >
      {isPending ? (
        <span className="animate-pulse">...</span>
      ) : isLoggedIn ? (
        "Rent your home"
      ) : (
        "Airbnb your home"
      )}
    </Button>
  );
}
