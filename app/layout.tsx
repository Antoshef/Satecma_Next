import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import GlobalError from './global-error';
import Loading from './loading';
import './globals.css';

export const metadata: Metadata = {
  title: 'Satecma - Industrias Químicas S.A.',
  description: 'The storage app',
  robots: {
    follow: true,
    index: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-full">
        <UserProvider>
          <div className="flex h-full">
            <ErrorBoundary errorComponent={GlobalError}>
              <div className="flex-1 relative">
                <Suspense fallback={<Loading />}>
                  <main>{children}</main>
                </Suspense>
              </div>
            </ErrorBoundary>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
