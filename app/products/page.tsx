import { baseUrl } from '@/constants';
import { Suspense } from 'react';
import ProductsTable from './productsTable';
import Loading from '@/loading';

export default async function ProductsPage() {
  let data = [];
  let error = undefined;

  try {
    const response = await fetch(`${baseUrl}/api/products`);

    if (!response.ok) {
      throw new Error(
        `Неуспешно зареждане на продуктите: ${response.statusText}`
      );
    }

    data = await response.json();
  } catch (err) {
    console.error('Грешка при зареждане на продуктите:', err);
    error = 'Неуспешно зареждане на продуктите';
  }

  return (
    <section>
      <Suspense fallback={<Loading />}>
        <ProductsTable data={data} error={error} />
      </Suspense>
    </section>
  );
}
