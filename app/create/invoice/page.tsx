import { InvoiceData } from './types';
import { baseUrl } from '@/constants';
import InvoiceBox from './invoiceBox';
import LogoProvider from '@/context/logoContext';
import { getSession } from '@auth0/nextjs-auth0';
import { INIT_PROVIDER } from './constants';

export default async function InvoicePage() {
  const session = await getSession();
  let products = [];
  let clients = [];
  let invoiceIds;
  let provider = INIT_PROVIDER;

  try {
    const productsResponse = await fetch(
      `${baseUrl}/api/products?user_id=${session?.user.sub}`
    );
    if (!productsResponse.ok) {
      throw new Error(
        `Failed to load products: ${productsResponse.statusText}`
      );
    }
    products = await productsResponse.json();
  } catch (error) {
    console.error('Error loading products:', error);
  }

  try {
    const clientsResponse = await fetch(
      `${baseUrl}/api/clients?user_id=${session?.user.sub}`
    );
    if (!clientsResponse.ok) {
      throw new Error(`Failed to load clients: ${clientsResponse.statusText}`);
    }
    clients = await clientsResponse.json();
  } catch (error) {
    console.error('Error loading clients:', error);
  }

  try {
    const invoiceIdsResponse = await fetch(
      `${baseUrl}/api/create/invoice?user_id=${session?.user.sub}`
    );
    if (!invoiceIdsResponse.ok) {
      throw new Error(
        `Failed to load invoice IDs: ${invoiceIdsResponse.statusText}`
      );
    }
    const invoiceData: InvoiceData[] = await invoiceIdsResponse.json();
    invoiceIds = invoiceData.map((item) => item.invoice_id);
  } catch (error) {
    console.error('Error loading invoice IDs:', error);
  }

  try {
    const providerResponse = await fetch(
      `${baseUrl}/api/companies?user_id=${session?.user.sub}`
    );
    if (!providerResponse.ok) {
      throw new Error(
        `Failed to load provider: ${providerResponse.statusText}`
      );
    }
    provider = await providerResponse.json();
  } catch (error) {
    console.error('Error loading provider:', error);
  }
  console.log(provider, 'provider');
  console.log(products, 'products');
  console.log(clients, 'clients');
  console.log(invoiceIds, 'invoiceIds');

  return (
    <LogoProvider>
      <InvoiceBox
        invoiceIds={invoiceIds}
        products={products}
        provider={provider}
        clients={clients}
      />
    </LogoProvider>
  );
}
