import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher(["/upload", "/files", "/view"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Continue to the requested page
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all routes except:
    // - Next.js internals (_next)
    // - Static files (by extension)
    // - Unless explicitly in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always check API & tRPC routes
    "/(api|trpc)(.*)",
  ],
};
