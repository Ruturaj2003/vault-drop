"use client";

import Image from "next/image";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <Image
        src="./errorimg.svg"
        alt="Error Illustration"
        width={400}
        height={300}
        className="mb-6"
      />

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        We encountered an error while loading the page. Please try again or go
        back to the homepage.
      </p>

      <Link href="/">
        <button className="px-6 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition">
          Go to Homepage
        </button>
      </Link>
    </div>
  );
}
