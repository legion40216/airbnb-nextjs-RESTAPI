"use client";
import { authClient } from "@/lib/auth-client";
import { useAuthModalStore } from "@/hooks/useAuthModalStore";
import { useCurrentUser } from "@/hooks/client-auth-utils";
import { 
  LogOut, 
  LogIn 
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { openModal } = useAuthModalStore();
  const { user, isPending } = useCurrentUser();
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await authClient.signOut();
    router.refresh()
  };

  const handleLogin = () => {
    openModal();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="!p-5"
          variant="ghost"
          size="icon"
          disabled={isPending}
        >
          <Avatar>
            <AvatarImage
              src={user?.image || (user ? "https://github.com/shadcn.png" : undefined)}
              alt={user?.name || "User"}
            />
            <AvatarFallback>
              {isPending 
                ? "..." 
                : user?.name 
                  ? user.name.charAt(0).toUpperCase() 
                  : "?"
              }
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-[9999]" align="end">
        <DropdownMenuLabel>{user ? "My Account" : "Welcome"}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {user ? (
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem onClick={handleLogin} className="cursor-pointer">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}