"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { AlertCircle, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Car,
  Fuel,
  Gauge,
  LocateFixed,
  Share2,
  Heart,
  MessageSquare,
  Currency,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toggleSavedCar } from "@/actions/car-listing";
import useFetch from "@/hooks/use-fetch";
import { formatCurrency } from "@/lib/helpers";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmiCalculator from "./emi-calculator";

export function CarDetails({ car, testDriveInfo }) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(car.wishlisted);

  const {
    loading: savingCar,
    fn: toggleSavedCarFn,
    data: toggleResult,
    error: toggleError,
  } = useFetch(toggleSavedCar);

  // Handle toggle result with useEffect
  useEffect(() => {
    if (toggleResult?.success) {
      setIsWishlisted(toggleResult.saved);
      toast.success(toggleResult.message);
    }
  }, [toggleResult]);

  // Handle errors with useEffect
  useEffect(() => {
    if (toggleError) {
      toast.error("Failed to update favorites");
    }
  }, [toggleError]);

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (car.images && car.images.length > 1) {
        if (e.key === 'ArrowLeft') {
          setCurrentImageIndex(prev => 
            prev === 0 ? car.images.length - 1 : prev - 1
          );
        } else if (e.key === 'ArrowRight') {
          setCurrentImageIndex(prev => 
            prev === car.images.length - 1 ? 0 : prev + 1
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [car.images]);

  // Handle save car
  const handleSaveCar = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to save cars");
      router.push("/sign-in");
      return;
    }

    if (savingCar) return;

    // Use the toggleSavedCarFn from useFetch hook
    await toggleSavedCarFn(car.id);
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${car.year} ${car.make} ${car.model}`,
          text: `Check out this ${car.year} ${car.make} ${car.model} on Vehiql!`,
          url: window.location.href,
        })
        .catch((error) => {
          console.log("Error sharing", error);
          copyToClipboard();
        });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  // Handle book test drive
  const handleBookTestDrive = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to book a test drive");
      router.push("/sign-in");
      return;
    }
    router.push(`/test-drive/${car.id}`);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="w-full lg:w-7/12">
          {/* Main Image with Navigation Arrows */}
          <div className="aspect-video rounded-lg overflow-hidden relative mb-4 group">
            {car.images && car.images.length > 0 ? (
              <>
                <Image
                  src={car.images[currentImageIndex]}
                  alt={`${car.year} ${car.make} ${car.model} - ${
                    ["Front View", "Side View", "Rear View", "Interior", "Dashboard", "Engine Bay", "Wheel & Tire", "Trunk Space"][currentImageIndex] || `View ${currentImageIndex + 1}`
                  }`}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Navigation Arrows - Only show if multiple images */}
                {car.images.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        prev === 0 ? car.images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    
                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        prev === car.images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {car.images.length}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Car className="h-24 w-24 text-gray-400" />
              </div>
            )}
          </div>

          {/* Enhanced Thumbnails */}
          {car.images && car.images.length > 1 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Car Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pb-2">
                {car.images.map((image, index) => {
                  // Define common car image labels
                  const imageLabels = [
                    "Front View",
                    "Side View", 
                    "Rear View",
                    "Interior",
                    "Dashboard",
                    "Engine Bay",
                    "Wheel & Tire",
                    "Trunk Space"
                  ];
                  
                  return (
                    <div
                      key={index}
                      className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0 ${
                        index === currentImageIndex
                          ? "ring-2 ring-blue-600 ring-offset-2 scale-105"
                          : "hover:scale-105 hover:ring-1 hover:ring-gray-300"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <div className="h-24 w-28 relative">
                        <Image
                          src={image}
                          alt={`${car.year} ${car.make} ${car.model} - ${
                            imageLabels[index] || `View ${index + 1}`
                          }`}
                          fill
                          className="object-cover"
                        />
                        {/* Overlay with view label */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded text-center">
                            {imageLabels[index] || `View ${index + 1}`}
                          </span>
                        </div>
                        
                        {/* Current image indicator */}
                        {index === currentImageIndex && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Active
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Secondary Actions */}
          <div className="flex mt-4 gap-4">
            <Button
              variant="outline"
              className={`flex items-center gap-2 flex-1 ${
                isWishlisted ? "text-red-500" : ""
              }`}
              onClick={handleSaveCar}
              disabled={savingCar}
            >
              <Heart
                className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`}
              />
              {isWishlisted ? "Saved" : "Save"}
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 flex-1"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
              Share
            </Button>
          </div>
        </div>

        {/* Car Details */}
        <div className="w-full lg:w-5/12">
          <div className="flex items-center justify-between">
            <Badge className="mb-2">{car.bodyType}</Badge>
          </div>

          <h1 className="text-4xl font-bold mb-1">
            {car.year} {car.make} {car.model}
          </h1>

          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(car.price)}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
            <div className="flex items-center gap-2">
              <Gauge className="text-gray-500 h-5 w-5" />
              <span>{car.mileage.toLocaleString()} miles</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="text-gray-500 h-5 w-5" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="text-gray-500 h-5 w-5" />
              <span>{car.transmission}</span>
            </div>
          </div>

          <Dialog>
            <DialogTrigger className="w-full text-start">
              <Card className="pt-5">
                <CardContent>
                  <div className="flex items-center gap-2 text-lg font-medium mb-2">
                    <Currency className="h-5 w-5 text-blue-600" />
                    <h3>EMI Calculator</h3>
                  </div>
                  <div className="text-sm text-gray-600">
                    Estimated Monthly Payment:{" "}
                    <span className="font-bold text-gray-900">
                      {formatCurrency(car.price / 60)}
                    </span>{" "}
                    for 60 months
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    *Based on $0 down payment and 4.5% interest rate
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Better-Car Loan Calculator</DialogTitle>
                <EmiCalculator price={car.price} />
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Request More Info */}
          <Card className="my-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-lg font-medium mb-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <h3>Have Questions?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Our representatives are available to answer all your queries
                about this vehicle.
              </p>
              <a href="mailto:help@bettercar.in">
                <Button variant="outline" className="w-full">
                  Request Info
                </Button>
              </a>
            </CardContent>
          </Card>

          {(car.status === "SOLD" || car.status === "UNAVAILABLE") && (
            <Alert variant="destructive">
              <AlertTitle className="capitalize">
                This car is {car.status.toLowerCase()}
              </AlertTitle>
              <AlertDescription>Please check again later.</AlertDescription>
            </Alert>
          )}

          {/* Book Test Drive Button */}
          {car.status !== "SOLD" && car.status !== "UNAVAILABLE" && (
            <Button
              className="w-full py-6 text-lg"
              onClick={handleBookTestDrive}
              disabled={testDriveInfo.userTestDrive}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {testDriveInfo.userTestDrive
                ? `Booked for ${format(
                    new Date(testDriveInfo.userTestDrive.bookingDate),
                    "EEEE, MMMM d, yyyy"
                  )}`
                : "Book Test Drive"}
            </Button>
          )}
        </div>
      </div>

      {/* Details & Features Section */}
      <div className="mt-12 p-6 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Description</h3>
            <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
              {car.description}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Features</h3>
            <ul className="grid grid-cols-1 gap-2">
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                {car.transmission} Transmission
              </li>
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                {car.fuelType} Engine
              </li>
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                {car.bodyType} Body Style
              </li>
              {car.seats && (
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                  {car.seats} Seats
                </li>
              )}
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                {car.color} Exterior
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="mt-8 p-6 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Specifications</h2>
        <div className="bg-gray-50 dark:bg-black rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Make</span>
              <span className="font-medium text-gray-900 dark:text-white">{car.make}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Model</span>
              <span className="font-medium text-gray-900 dark:text-white">{car.model}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Year</span>
              <span className="font-medium text-gray-900 dark:text-white">{car.year}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Body Type</span>
              <span className="font-medium text-gray-900 dark:text-white">{car.bodyType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Fuel Type</span>
              <span className="font-medium text-gray-900 dark:text-white">{car.fuelType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Transmission</span>
              <span className="font-medium text-gray-900 dark:text-white">{car.transmission}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Mileage</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {car.mileage.toLocaleString()} miles
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Color</span>
              <span className="font-medium text-gray-900 dark:text-white">{car.color}</span>
            </div>
            {car.seats && (
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Seats</span>
                <span className="font-medium text-gray-900 dark:text-white">{car.seats}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dealership Location Section */}
      <div className="mt-8 p-6 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Dealership Location</h2>
        <div className="bg-gray-50 dark:bg-black rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            {/* Dealership Name and Address */}
            <div className="flex items-start gap-3">
              <LocateFixed className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Better-Car Motors</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {testDriveInfo.dealership?.address || "Not Available"}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Phone: {testDriveInfo.dealership?.phone || "Not Available"}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Email: {testDriveInfo.dealership?.email || "Not Available"}
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="md:w-1/2 lg:w-1/3">
              <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Working Hours</h4>
              <div className="space-y-2">
                {testDriveInfo.dealership?.workingHours
                  ? testDriveInfo.dealership.workingHours
                      .sort((a, b) => {
                        const days = [
                          "MONDAY",
                          "TUESDAY",
                          "WEDNESDAY",
                          "THURSDAY",
                          "FRIDAY",
                          "SATURDAY",
                          "SUNDAY",
                        ];
                        return (
                          days.indexOf(a.dayOfWeek) - days.indexOf(b.dayOfWeek)
                        );
                      })
                      .map((day) => (
                        <div
                          key={day.dayOfWeek}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600 dark:text-gray-400">
                            {day.dayOfWeek.charAt(0) +
                              day.dayOfWeek.slice(1).toLowerCase()}
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {day.isOpen
                              ? `${day.openTime} - ${day.closeTime}`
                              : "Closed"}
                          </span>
                        </div>
                      ))
                  : // Default hours if none provided
                    [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day, index) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{day}</span>
                        <span className="text-gray-900 dark:text-white">
                          {index < 5
                            ? "9:00 - 18:00"
                            : index === 5
                            ? "10:00 - 16:00"
                            : "Closed"}
                        </span>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}