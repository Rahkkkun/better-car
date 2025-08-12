"use client";

import { CarFilters } from "./car-filters";
import { CarListings } from "./car-listing";

export function CarsClientWrapper({ filters }) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Section */}
      <div className="w-full lg:w-80 flex-shrink-0">
        <CarFilters filters={filters} />
      </div>

      {/* Car Listings */}
      <div className="flex-1">
        <CarListings />
      </div>
    </div>
  );
}
