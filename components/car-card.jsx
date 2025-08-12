"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { CarIcon, Heart, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toggleSavedCar } from "@/actions/car-listing";

const CarCard = ({ car }) => {
  const [isSaved, setIsSaved] = useState(car.wishlisted);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const result = await toggleSavedCar(car.id);
      
      if (result.success) {
        setIsSaved(result.saved);
        
        if (result.saved) {
          toast.success("Car saved to favorites!", {
            description: "You can view all your saved cars in the Saved Cars section.",
          });
        } else {
          toast.success("Car removed from favorites", {
            description: "The car has been removed from your saved cars.",
          });
        }
      } else {
        toast.error("Failed to update favorites", {
          description: result.error || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error toggling saved car:", error);
      
      // Handle specific error cases
      if (error.message.includes("Unauthorized")) {
        toast.error("Please sign in to save cars", {
          description: "You need to be signed in to save cars to your favorites.",
        });
      } else {
        toast.error("Failed to update favorites", {
          description: "Please try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition group py-0 cursor-pointer">
      <div className="relative h-68">
        {car.images && car.images.length > 0 ? (
          <div className="relative w-full h-full">
            <Image
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <CarIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}

        <Button
          variant={"ghost"}
          size="icon"
          className={`absolute top-2 right-2 bg-white/90 rounded-full p-1.5 ${
            isSaved
              ? "text-red-500 hover:text-red-600"
              : "text-gray-600 hover:text-gray-600"
          }`}
          onClick={handleToggleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Heart className={isSaved ? "fill-current" : ""} size={20} />
          )}
        </Button>
      </div>

      <CardContent className={"p-4"}>
        <div className="flex flex-col mb-2">
          <h3 className="text-lg font-bold line-clamp-1">
            {car.make}
            {car.model}
          </h3>
          <span className="text-xl font-bold text-blue-500">
            ${car.price.toLocaleString()}
          </span>
        </div>

        <div className="text-gray-600 mb-2 flex items-center">
          <span>{car.year}</span>
          <span className="mx-2">•</span>
          <span>{car.transmission}</span>
          <span className="mx-2">•</span>
          <span>{car.fuelType}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          <Badge variant="outline" className="bg-gray-50 dark:bg-black text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800">
            {car.bodyType}
          </Badge>
          <Badge variant="outline" className="bg-gray-50 dark:bg-black text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800">
            {car.mileage.toLocaleString()} miles
          </Badge>
          <Badge variant="outline" className="bg-gray-50 dark:bg-black text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800">
            {car.color}
          </Badge>
        </div>

        <div className="flex justify-between">
          <Button
            className="w-full"
            onClick={() => {
              router.push(`/cars/${car.id}`);
            }}
          >
            View Car
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
