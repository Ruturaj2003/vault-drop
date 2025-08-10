"use client";

import { SignedIn, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Navbar } from "./_components/navbar";
import ThemeTester from "./_components/themeTester";

export default function Home() {
  const { userId } = useAuth();

  return (
    <div className="">
      <Navbar />
      <h1>Hello</h1>
      <ThemeTester />
    </div>
  );
}
