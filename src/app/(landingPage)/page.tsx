"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { SignedIn, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const user = useAuth();
  return (
    <div className="bg-cyan-100">
      <h1 className="h-16 w-16 text-black">Hello</h1>
      <Button variant={"secondary"}>Btn</Button>

      <SignedIn>
        <h1>Your User Id is :{user.userId} </h1>
        <Link href={"/upload"}>Go to Upload</Link>
        <Link href={"/files"}>Go to Files</Link>
      </SignedIn>

      <LoadingSpinner></LoadingSpinner>
    </div>
  );
}
