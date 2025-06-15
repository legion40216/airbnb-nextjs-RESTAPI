'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Hamburger } from "lucide-react";
import { useCurrentUser } from "@/hooks/client-auth-utils";

export default function DropDownNav() {
  const { user, isPending } = useCurrentUser();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown open/close

  const allRoutes = [
    { label: "My Trips", href: "/trips" },
    { label: "My Favorites", href: "/favorites" },
    { label: "My Reservations", href: "/reservations" },
    { label: "My Properties", href: "/properties" },
    { label: "Airbnb Home", href: "/" },
  ];

  useEffect(() => {
    const matchedRoute = allRoutes.find((route) =>
      pathname === route.href || pathname?.startsWith(route.href)
    );
    setActiveLink(matchedRoute?.href || null);
  }, [pathname]);

  // Show the button if we're still loading OR if user is logged in
  // Only hide it when we're done loading AND there's no user
  if (!isPending && !user) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={"icon"}
          disabled={isPending}
        >
          {isPending ? (
            <span className="animate-pulse">...</span>
          ) : (
            <Hamburger className="size-6" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-[9999]" align="end">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {allRoutes.map((route) => (
          <DropdownMenuItem key={route.href} className="p-0">
            <Link
              href={route.href}
              className={`block w-full px-3 py-2 rounded-md text-sm transition-colors
                hover:bg-muted
                ${activeLink === route.href ? "text-primary font-medium" : "text-muted-foreground"}
              `}
              onClick={() => setIsOpen(false)} // Close dropdown on link click
            >
              {route.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}