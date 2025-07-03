import Headings from "@/components/global-ui/headings";
import React from "react";
import ListingBanner from "../components/listing-banner";

type SectionBannerHeadingProps = {
  listingId: string;
  title: string;
  locationRegion: string;
  locationLabel: string;
  imgSrc: string;
};

export default function SectionBannerHeading({
  initialData,
}: {
  initialData: SectionBannerHeadingProps;
}) {
  const subtitle = `${initialData.locationRegion}, ${initialData.locationLabel}`;

  return (
    <div className="space-y-4">
      <Headings title={initialData.title} subtitle={subtitle} />

      <ListingBanner
        listingId={initialData.listingId}
        imgSrc={initialData.imgSrc}
      />
    </div>
  );
}
