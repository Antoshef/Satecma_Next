import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import SidePanel from '@/components/sidePanel';
import GlobalError from '@/global-error';
import Loading from '@/loading';
import { baseUrl } from '@/constants';

export const metadata: Metadata = {
  title: 'Satecma - Industrias Químicas S.A.',
  description: 'The storage app',
  robots: {
    follow: true,
    index: true
  }
};

export default async function ClientLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { url } = await fetch(`${baseUrl}/api/upload`).then((res) =>
    res.json()
  );
  return (
    <div className="flex h-full">
      <SidePanel logoUrl={url} />
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
