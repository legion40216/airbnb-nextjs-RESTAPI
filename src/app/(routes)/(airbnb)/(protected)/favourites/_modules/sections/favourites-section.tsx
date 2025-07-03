import React from "react";

import Headings from "@/components/global-ui/headings";
import FavourtiesList from "../components/favourties-list";

type FavourtiesSectionProps = {
  initialData: {
    id: string;
    locationRegion: string;
    locationLabel: string;
    imgSrc: string;
    category: string;
    price: string;
    isFavoritedByCurrentUser?: boolean;
  }[];
};

export default function FavourtiesSection({
  initialData,
}: FavourtiesSectionProps) {
  return (
    <div className="space-y-4">
      <Headings title="Favourties" subtitle="List of your favourties" />

      <div>
        <FavourtiesList data={initialData} />
      </div>
    </div>
  );
}
