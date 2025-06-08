"use client"
import { authClient } from "@/lib/auth-client"

export function useCurrentUser() {
  const { data: session, isPending, error } = authClient.useSession();
  
  return { user: session?.user, session: session?.session, isPending, error };
}
