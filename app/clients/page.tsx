import { baseUrl } from '@/constants';
import ClientsTable from './clientsTable';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function ClientsPage() {
  const data = await fetch(`${baseUrl}/api/clients`)
    .then((data) => data.json())
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
