import { Suspense } from 'react';
import ClientsTable from './clientsTable';
import Loading from '@/loading';
import { baseUrl } from '@/constants';
import { getSession } from '@auth0/nextjs-auth0';

export default async function ClientsPage() {
  let data = [];
  let error = undefined;

  try {
    // Fetch the session to get the user information
    const session = await getSession();
    const userId = session?.user.sub;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`${baseUrl}/api/clients?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

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
}
