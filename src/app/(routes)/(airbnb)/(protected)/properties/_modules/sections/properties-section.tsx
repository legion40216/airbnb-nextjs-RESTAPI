import React from "react";
import PropertiesList from "../components/properties-list";
import Headings from "@/components/global-ui/headings";

type PropertiesSectionProps = {
  formattedListings: {
    id: string;
    locationRegion: string;
    locationLabel: string;
    imgSrc: string;
    category: string;
    price: string;
    isFavoritedByCurrentUser?: boolean;
  }[];
};

export default function PropertiesSection({
  formattedListings,
}: PropertiesSectionProps) {
  return (
    <div className="space-y-4">
      <Headings title="Proerties" subtitle="List of your proerties" />

      <div>
        <PropertiesList data={formattedListings} />
      </div>
    </div>
  );
}
