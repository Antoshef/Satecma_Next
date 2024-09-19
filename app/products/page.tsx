import { baseUrl } from '@/constants';
import { Suspense } from 'react';
import ProductsContainer from './productsContainer';
import Loading from '@/loading';

export default async function ProductsPage() {
  const data = await fetch(`${baseUrl}/api/products`)
    .then((data) => data.json())
    .catch((error) => {
      console.error(error);
      return [];
    });

  return (
    <section>
      <Suspense fallback={<Loading />}>
        <ProductsContainer data={data} />
      </Suspense>
    </section>
  );
}
