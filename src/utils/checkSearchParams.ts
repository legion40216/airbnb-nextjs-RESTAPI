"use client"
import { useSearchParams } from "next/navigation";

export const checkSearchParams = () => {
  const searchParams = useSearchParams();
  const hasQuery = Array.from(searchParams.keys()).length > 0;
  
  return hasQuery;
}