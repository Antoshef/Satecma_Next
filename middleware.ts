import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';

// Define the paths that require authentication
const protectedRoutes = ['/store', '/clients', '/sent', '/create'];

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(request, res);

  if (!session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const { accessToken } = session;

  const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  const user = await response.json();
  console.log(user, 'USER');

  // If the user is not authenticated and tries to access protected routes, redirect them
  if (
    !user.email_verified &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    // Redirect to home page if not authenticated
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow the request to proceed if authenticated or on a public page
  return res;
}

export const config = {
  matcher: [
    '/store/:path*',
    '/clients/:path*',
    '/sent/:path*',
    '/create/:path*'
  ] // add your protected routes here
};
