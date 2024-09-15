import { fetchData } from '@/utils/fetchData';
import ClientsTable from './clientsTable';
import { Client } from './utils/types';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function ClientsPage() {
  const data = await fetchData<Client[]>('http://localhost:3000/api/clients')
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return [];
    });

  return (
    <section>
      <ClientsTable data={data} />
    </section>
  );
});
