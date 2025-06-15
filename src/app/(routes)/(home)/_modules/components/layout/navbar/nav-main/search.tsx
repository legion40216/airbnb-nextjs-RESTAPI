"use client";
import useCountries from "@/hooks/useCountries";
import { useMultiModalStore } from "@/hooks/useMultiModalStore";

import { differenceInDays } from "date-fns";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function Search() {
  const params = useSearchParams();
  const { getByValue } = useCountries();
  const { openModal }  = useMultiModalStore();

  const locationValue   = params?.get("locationValue");
  const startDate  = params?.get("startDate");
  const endDate    = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  // Location label: show country name or default to 'Anywhere'
  const locationLabel = useMemo(() => {
    if (locationValue) {
      const country = getByValue(locationValue);
      return country ? country.label : "Anywhere";
    }
    return "Anywhere";
  }, [getByValue, locationValue]);

  // Duration label: calculate difference in days
  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  // Guest label: show guest count or default to 'Add Guests'
  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guests";
  }, [guestCount]);

  return (
    <div className="flex items-center justify-between gap-4 w-full 
    md:w-auto px-4 py-2 shadow-sm hover:shadow-md transition 
    border border-gray-300 rounded-full cursor-pointer"
    onClick={() => openModal("search")}
    >
      <div className="text-sm font-medium text-gray-700 truncate">
        {locationLabel}
      </div>

      <div className="hidden sm:flex items-center px-2 border-x 
      border-gray-200">
        <span className="text-sm text-gray-500 truncate">
          {durationLabel}
        </span>
      </div>

      <div className="hidden sm:flex items-center">
        <span className="text-sm text-gray-400 truncate">
          {guestLabel}
        </span>
      </div>

      <div className="p-2 bg-rose-500 rounded-full text-white">
        <SearchIcon width={18} height={18} />
      </div>
    </div>
  );
}