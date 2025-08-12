import HomeSearch from "@/components/home-search";
import { Button } from "@/components/ui/button";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";
import React from "react";
import { bodyTypes, carMakes, faqItems, featuredCars } from "@/lib/data";
import { Card } from "@/components/ui/card";
import CarCard from "@/components/car-card";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SignedOut } from "@clerk/nextjs";
import { getFeaturedCars } from "@/actions/home";


export default async function Home() {
  const featuredCars = await getFeaturedCars();

  return (
    <div className="flex flex-col pt-20">
      {/* Hero Section with Gradient Title */}
      <section
        className="relative py-26 md:py-38"
        style={{
          background: `
              radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
              radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
              radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
              radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
              #000000
            `,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl mb-4 font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              You Deserve a 'BETTER-CAR'
            </h1>

            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Advanced AI Car Search and test drive from thousands of vehicles.
            </p>
          </div>

          {/* Search Component (Client) */}
          <HomeSearch />
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Cars
            </h2>
            <Button variant={"outline"} className={"flex items-center"} asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
            {featuredCars.map((car) => {
              return <CarCard key={car.id} car={car} />;
            })}
          </div>
        </div>
      </section>

      <section
        className="py-12 bg-gray-50 dark:bg-black"
        style={{
          background: "#000000",
          backgroundImage: `
              radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
            `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Browse by Make
            </h2>
            <Button variant={"outline"} className={"flex items-center"} asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {carMakes.map((make) => (
              <Link
                key={make.name}
                href={`/cars?make=${make.name}`}
                className="bg-white dark:bg-black rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer border border-gray-200 dark:border-gray-800"
              >
                <div className="h-16 w-auto mx-auto mb-2 relative">
                  <Image
                    src={
                      make.imageUrl || `/make/${make.name.toLowerCase()}.webp`
                    }
                    alt={make.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {make.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Wide Selection
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Thousands of verified vehicles from trusted dealerships and
                private sellers.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Easy Test Drive
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Book a test drive online in minutes, with flexible scheduling
                options.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Secure Process
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Verified listings and secure booking process for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Body Type */}
      <section
        className="py-12 bg-gray-50 dark:bg-black"
        style={{
          background: "#000000",
          backgroundImage: `
              radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
            `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Browse by Body Type
            </h2>
            <Button variant="outline" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyTypes.map((type) => (
              <Link
                key={type.name}
                href={`/cars?bodyType=${type.name}`}
                className="relative group cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg flex justify-end h-28 mb-4 relative">
                  <Image
                    src={
                      type.imageUrl || `/body/${type.name.toLowerCase()}.webp`
                    }
                    alt={type.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
                  <h3 className="text-white text-xl font-bold pl-4 pb-2 ">
                    {type.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-12 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-gray-900 dark:text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 text-white"
        style={{
          background: "#000000",
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect
            vehicle through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/cars">View All Cars</Link>
            </Button>
            <SignedOut>
              <Button size="lg" asChild>
                <Link href="/sign-up">Sign Up Now</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}
