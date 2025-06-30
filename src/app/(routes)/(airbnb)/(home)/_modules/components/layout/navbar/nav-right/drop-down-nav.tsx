'use client';
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hamburger } from "lucide-react";
import { useCurrentUser } from "@/hooks/client-auth-utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function DropDownNav() {
  const { user, isPending } = useCurrentUser();
  const isLoggedIn = !!user;
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const allRoutes = [
    { label: "My Trips",        href: "/trips" },
    { label: "My Favourites",   href: "/favourites" },
    { label: "My Reservations", href: "/reservations" },
    { label: "My Properties",   href: "/properties" },
    { label: "Airbnb Home",     href: "/" },
  ];

  useEffect(() => {
    const matchedRoute = allRoutes.find((route) =>
      pathname === route.href || pathname?.startsWith(route.href)
    );
    setActiveLink(matchedRoute?.href || null);
  }, [pathname]);

  
  if (!isPending && !isLoggedIn) {
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