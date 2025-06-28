"use client"
import { useSearchParams } from "next/navigation";

//Make a more robust remove filter funtion actully checking the search params of those filters 

export const checkSearchParams = () => {
  const searchParams = useSearchParams();
  const hasQuery = Array.from(searchParams.keys()).length > 0;
  
  return hasQuery;
}