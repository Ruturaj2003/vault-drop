"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, useAuth } from "@clerk/nextjs";

export default function Home() {
  const user = useAuth();
  return (
    <div className="bg-cyan-100">
      <h1 className="h-16 w-16 text-black">Hello</h1>
      <Button variant={"secondary"}>Btn</Button>

      <SignedIn>
        <h1>Your User Id is :{user.userId} </h1>
      </SignedIn>
    </div>
  );
}
