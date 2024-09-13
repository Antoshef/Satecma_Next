import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the paths that require authentication
const protectedRoutes = ["/store", "/clients", "/sent", "/create"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  // If the user is not authenticated and tries to access protected routes, redirect them
  if (
    !token &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    // Redirect to home page if not authenticated
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed if authenticated or on a public page
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/store/:path*",
    "/clients/:path*",
    "/sent/:path*",
    "/create/:path*",
  ], // add your protected routes here
};
