"use client";

import React, { useEffect, useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import { Button } from "./ui/button";
import { PiCarSimpleFill } from "react-icons/pi";

const Header = ({ isAdminPage = false }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.user ?? null);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const isAdmin = user?.role === "ADMIN";

  if (isLoading) {
    return (
      <header className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <nav className="mx-auto px-4 py-4 flex items-center justify-between">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href={isAdminPage ? "/admin" : "/"}
          className="flex items-center gap-2"
        >
          <PiCarSimpleFill className="h-6 w-6 text-gray-900 dark:text-white" />
          <h1 className="text-xl  text-gray-900 dark:text-white">
            BETTER-CAR.
          </h1>
          {isAdminPage && (
            <span className="ml-1 text-xs font-extralight text-gray-600 dark:text-gray-400">
              admin
            </span>
          )}
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {isAdminPage ? (
            <Link href={"/"}>
              <Button variant={"outline"} className={"flex items-center gap-2"}>
                <ArrowLeft size={18} />
                <span>Back to App</span>
              </Button>
            </Link>
          ) : (
            <SignedIn>
              <Link href={"/saved-cars"}>
                <Button>
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </Link>

              {!isAdmin ? (
                <Link href={"/reservations"}>
                  <Button variant={"outline"}>
                    <CarFront size={18} />
                    <span className="hidden md:inline">My Reservations</span>
                  </Button>
                </Link>
              ) : (
                <Link href={"/admin"}>
                  <Button variant={"outline"}>
                    <Layout size={18} />
                    <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button variant={"outline"}>Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
