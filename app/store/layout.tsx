import { Suspense } from 'react';
import Store from './page';
import { baseUrl } from '@/constants';

export default async function StoreLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetch(`${baseUrl}/api/products/get`)
    .then((data) => data.json())
    .catch((error) => {
      console.error(error);
      return [];
    });

  return (
    <section>
      <Suspense>
        <Store data={data} />
      </Suspense>
    </section>
  );
}
