import { baseUrl } from '@/constants';
import InvoiceBox from './invoiceBox';
import { getInvoiceNumber } from './utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function InvoicePage() {
  const products = await fetch(`${baseUrl}/api/products/get`)
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error:', error);
      return [];
    });

  const clients = await fetch(`${baseUrl}/api/clients`)
    .then((data) => data.json())
    .catch((error) => {
      console.error(error);
      return [];
    });

  const invoiceIds = await fetch(`${baseUrl}/api/create/invoice`)
    .then(async (data) => getInvoiceNumber(await data.json()))
    .catch((error) => {
      console.error('Error:', error);
      return {
        current: '1000000000',
        previous: '0000100000',
        proforma: '0000000000'
      };
    });

  const provider = await fetch(`${baseUrl}/api/company`).then((res) =>
    res.json()
  );

  return (
    <InvoiceBox
      invoiceIds={invoiceIds}
      products={products}
      provider={provider}
      clients={clients}
    />
  );
});
