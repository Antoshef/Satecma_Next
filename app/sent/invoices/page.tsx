import { baseUrl } from '@/constants';
import InvoicesTable from './invoicesTable';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function InvoicesPage() {
  const invoices = await fetch(`${baseUrl}/api/create/invoice`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });

  return (
    <div>
      <h1>Фактури</h1>
      <InvoicesTable data={invoices} />
    </div>
  );
});
