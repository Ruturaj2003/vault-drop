"use client";

import { SignedIn, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Navbar } from "./_components/navbar";
import ThemeTester from "./_components/themeTester";
import { Hero } from "./_components/hero";

export default function Home() {
  const { userId } = useAuth();

  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
    </div>
  );
}
