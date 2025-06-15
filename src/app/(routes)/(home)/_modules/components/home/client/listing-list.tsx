"use client";
import React from "react";
import ListingCard from "./listing-list/listing-card";

type ListingsItem = {
  id: string;
  locationRegion: string;
  locationLabel: string;
  imgSrc: string;
  category: string;
  price: string;
};

type ListingsListProps = {
  data: ListingsItem[];
};

export default function ListingLists({ data }: ListingsListProps) {
  return (
    <div>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 
        sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]"
        >
          {data?.map((item) => (
            <ListingCard
              key={item.id}
              id={item.id}
              locationRegion={item.locationRegion}
              locationLabel={item.locationLabel}
              imgSrc={item.imgSrc}
              category={item.category}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
}
