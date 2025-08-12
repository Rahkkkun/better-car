"use client";

import { Check, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export const CarFilterControls = ({
  filters,
  currentFilters,
  onFilterChange,
  onClearFilter,
}) => {
  const { make, bodyType, fuelType, transmission, priceRange } = currentFilters;

  const filterSections = [
    {
      id: "make",
      title: "Make",
      options: filters.makes.map((make) => ({ value: make, label: make })),
      currentValue: make,
      onChange: (value) => onFilterChange("make", value),
    },
    {
      id: "bodyType",
      title: "Body Type",
      options: filters.bodyTypes.map((type) => ({ value: type, label: type })),
      currentValue: bodyType,
      onChange: (value) => onFilterChange("bodyType", value),
    },
    {
      id: "fuelType",
      title: "Fuel Type",
      options: filters.fuelTypes.map((type) => ({ value: type, label: type })),
      currentValue: fuelType,
      onChange: (value) => onFilterChange("fuelType", value),
    },
    {
      id: "transmission",
      title: "Transmission",
      options: filters.transmissions.map((type) => ({
        value: type,
        label: type,
      })),
      currentValue: transmission,
      onChange: (value) => onFilterChange("transmission", value),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 dark:text-white">Price Range</h3>
        <div className="px-2">
          <Slider
            min={filters.priceRange.min}
            max={filters.priceRange.max}
            step={100}
            value={priceRange}
            onValueChange={(value) => onFilterChange("priceRange", value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm text-gray-900 dark:text-white">$ {priceRange[0]}</div>
          <div className="font-medium text-sm text-gray-900 dark:text-white">$ {priceRange[1]}</div>
        </div>
      </div>

      {/* Filter Categories */}
      {filterSections.map((section) => (
        <div key={section.id} className="space-y-3">
          <h4 className="text-sm font-medium flex justify-between text-gray-900 dark:text-white">
            <span>{section.title}</span>
            {section.currentValue && (
              <button
                className="text-xs text-gray-600 dark:text-gray-400 flex items-center hover:text-gray-900 dark:hover:text-white"
                onClick={() => onClearFilter(section.id)}
              >
                <X className="mr-1 h-3 w-3" />
                Clear
              </button>
            )}
          </h4>
          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
            {section.options.map((option) => (
              <Badge
                key={option.value}
                variant={
                  section.currentValue === option.value ? "default" : "outline"
                }
                className={`cursor-pointer px-3 py-1 ${
                  section.currentValue === option.value
                    ? "bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-700"
                    : "bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800"
                }`}
                onClick={() => {
                  section.onChange(
                    section.currentValue === option.value ? "" : option.value
                  );
                }}
              >
                {option.label}
                {section.currentValue === option.value && (
                  <Check className="ml-1 h-3 w-3 inline" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};