import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import SidePanel from './components/sidePanel';
import './globals.css';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import GlobalError from './global-error';

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
            <SidePanel />
            <ErrorBoundary errorComponent={GlobalError}>
              <div className="flex-1 relative">
                <Suspense>
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
