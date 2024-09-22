import { baseUrl } from '@/constants';
import { Suspense } from 'react';
import InvoicesTable from './invoicesTable';
import Loading from '@/loading';

export default async function InvoicesPage() {
  let data = [];
  let error = undefined;

  try {
    const response = await fetch(`${baseUrl}/api/create/invoice`);

    if (!response.ok) {
      throw new Error(
        `Неуспешно зареждане на фактурите: ${response.statusText}`
      );
    }

    data = await response.json();
  } catch (err) {
    console.error('Грешка при зареждане на фактурите:', err);
    error = 'Неуспешно зареждане на фактурите';
  }

  return (
    <section>
      <Suspense fallback={<Loading />}>
        <InvoicesTable data={data} error={error} />
      </Suspense>
    </section>
  );
}
