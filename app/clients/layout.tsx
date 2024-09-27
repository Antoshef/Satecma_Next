import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import SidePanel from '@/components/sidePanel';
import GlobalError from '@/global-error';
import Loading from '@/loading';

export const metadata: Metadata = {
  title: 'Satecma - Industrias Químicas S.A.',
  description: 'The storage app',
  robots: {
    follow: true,
    index: true
  }
};

export default function ClientLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full">
      <SidePanel />
      <ErrorBoundary errorComponent={GlobalError}>
        <div className="flex-1 relative">
          <Suspense fallback={<Loading />}>
            <main>{children}</main>
          </Suspense>
        </div>
      </ErrorBoundary>
    </div>
  );
}
