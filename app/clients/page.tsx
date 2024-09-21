import { baseUrl } from '@/constants';
import { Suspense } from 'react';
import ClientsTable from './clientsTable';
import Loading from '@/loading';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function ClientsPage() {
  let data = [];
  let error = undefined;

  try {
    const response = await fetch(`${baseUrl}/api/clients`);

    if (!response.ok) {
      throw new Error(
        `Неуспешно зареждане на клиентите: ${response.statusText}`
      );
    }

    data = await response.json();
  } catch (err) {
    console.error('Грешка при зареждане на клиентите:', err);
    error = 'Неуспешно зареждане на клиентите';
  }

  return (
    <section>
      <Suspense fallback={<Loading />}>
        <ClientsTable data={data} error={error} />
      </Suspense>
    </section>
  );
});
