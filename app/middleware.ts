// middleware.ts
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';

export async function middleware(req) {
  const session = await getSession(req);

  // If there is no session, redirect to the login page
  if (!session) {
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }

  // If the user is authenticated but email is not verified, redirect to verify email page
  if (!session.user.email_verified) {
    return NextResponse.redirect(new URL('/verify-email', req.url));
  }

  // If everything is fine, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/create/invoice'] // Define routes where middleware is applied
};
