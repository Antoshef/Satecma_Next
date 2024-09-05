import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { getSession } from "@/utils/getSession";

export async function GET(req: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "No session found" }, { status: 401 });
  }

  const user = session.user;

  // Set the session data in an HTTP-only cookie
  const cookie = serialize("userSession", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "strict",
    path: "/",
  });

  const response = NextResponse.json({ message: "Session stored in cookie" });
  response.headers.set("Set-Cookie", cookie);

  return response;
}
