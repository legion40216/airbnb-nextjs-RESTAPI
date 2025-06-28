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
  bannerData,
}: {
  bannerData: SectionBannerHeadingProps;
}) {
  const subtitle = `${bannerData.locationRegion}, ${bannerData.locationLabel}`;

  return (
    <>
      <Headings title={bannerData.title} subtitle={subtitle} />

      <ListingBanner
        listingId={bannerData.listingId}
        imgSrc={bannerData.imgSrc}
      />
    </>
  );
}
