"use client";

import { Navbar } from "./_components/navbar";

import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { UseCases } from "./_components/use-cases";
import { Features } from "./_components/features";
import { CTA } from "./_components/cta";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <div className="flex flex-col dark:bg-[rgb(2,10,24)] min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col w-full">
        <Hero />
        <HowItWorks />
        <UseCases />
        <Features />
        <CTA />
        <Footer></Footer>
      </main>
    </div>
  );
}
