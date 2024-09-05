import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

export async function middleware(req: NextRequest, res: NextResponse) {
  const session = await getSession(req, res);

  if (!session) {
    return NextResponse.redirect("/api/auth/login"); // Redirect to login if session doesn't exist
  }

  return NextResponse.next();
}

// Only run middleware on certain paths
export const config = {
  matcher: ["/*"], // Protect these paths
};
