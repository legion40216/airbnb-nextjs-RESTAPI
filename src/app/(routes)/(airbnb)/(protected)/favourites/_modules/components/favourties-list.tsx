'use client';
import React from 'react'

import FavourtiesCard from './favourties-list/favourite-card';

type FavourtiesItem = {
  id: string;
  locationRegion: string;
  locationLabel: string;
  imgSrc: string;
  category: string;
  price: string;
  isFavoritedByCurrentUser?: boolean;
};

type FavourtiesListProps = {
  data: FavourtiesItem[];
};

export default function FavourtiesList({ data }: FavourtiesListProps) {
  
  return (
      <div>
        {data && data.length > 0 ? (
          <div
            className="grid grid-cols-2 gap-3 
              sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]"
          >
            {data?.map((item) => (
              <FavourtiesCard
                key={item.id}
                id={item.id}
                locationRegion= {item.locationRegion}
                locationLabel= {item.locationLabel}
                imgSrc={item.imgSrc}
                category={item.category}
                price={item.price}
                isFavoritedByCurrentUser={item.isFavoritedByCurrentUser}
              />
            ))}
          </div>
        ) : (
          <div>No results found</div>
        )}
      </div>
  )
}
