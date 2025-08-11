"use client";

import { SignedIn, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Navbar } from "./_components/navbar";
import ThemeTester from "./_components/themeTester";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";

export default function Home() {
  const { userId } = useAuth();

  return (
    <div className="flex flex-col dark:bg-[rgb(2,10,24)]">
      <Navbar />
      <Hero />
      <HowItWorks />
    </div>
  );
}
