import React from "react";
import { useAuthModalStore } from "@/hooks/useAuthModalStore";
import { useCurrentUser } from "@/hooks/client-auth-utils";
import { useMultiModalStore } from "@/hooks/useMultiModalStore";

import { Button } from "@/components/ui/button";
export default function RentHomeBtn() {
  const { user, isPending } = useCurrentUser();
  const { openModal } = useMultiModalStore();
  const { openModal: openAuthModal } = useAuthModalStore();

  const handleClick = () => {
    if (user) {
      openModal("rent");
    } else {
      openAuthModal();
    }
  };

  return (
    <Button
      variant={"outline"}
      onClick={handleClick}
      className="rounded-full"
      size="lg"
      disabled={isPending}
    >
      {isPending ? (
        <span className="animate-pulse">...</span>
      ) : user ? (
        "Rent your home"
      ) : (
        "Airbnb your home"
      )}
    </Button>
  );
}
