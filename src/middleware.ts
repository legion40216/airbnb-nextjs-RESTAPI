import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getSessionCookie } from 'better-auth/cookies'

import {
  apiAuthPrefix,
  authRoutes,
  defaultLoggedInRoute,
  publicRoutes,
} from "@/routes";

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  
  // Skip middleware for image assets and Next.js internals
  if (
    nextUrl.pathname.startsWith('/images') || 
    nextUrl.pathname.startsWith('/_next') ||
    nextUrl.pathname === '/favicon.ico'
  ) {
    return;
  }
  
  // Get the auth session
  const sessionCookie = getSessionCookie(request);
  const isLoggedIn = !!sessionCookie;

  // Define route type checks
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some((route) =>
  nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  
  // Handle API routes (no redirect needed)
  if (isApiAuthRoute) {
    return;
  }

  // Handle auth routes (login, register, etc.)
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(defaultLoggedInRoute, nextUrl));
    }
    return;
  }

  // If not logged in and trying to access protected route
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl));
  }

  return;
}

export const config = {
  matcher: [
    // Match all request paths except for the ones we explicitly exclude
    '/((?!api|_next|images|favicon.ico).*)',
  ],
};