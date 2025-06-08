// lib/currentUser.ts
import { auth } from "@/lib/auth"; // Adjust the import path as needed
import { headers } from "next/headers";

export async function currentUser() {
const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

  return session?.user || null; // Return the user object or null if not authenticated
}
