import { Client } from '@/clients/utils/types';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Company, InvoiceData } from './types';
import { Product } from '@/products/utils/types';
import InvoiceForm from './test/invoiceForm';
import { baseUrl } from '@/constants';

export default withPageAuthRequired(async function InvoicePage() {
  let products: Product[] = [];
  let clients: Client[] = [];
  let invoiceIds: string[] = [];
  let provider: Company | null = null;

  try {
    const productsResponse = await fetch(`${baseUrl}/api/products`);
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
    const clientsResponse = await fetch(`${baseUrl}/api/clients`);
    if (!clientsResponse.ok) {
      throw new Error(`Failed to load clients: ${clientsResponse.statusText}`);
    }
    clients = await clientsResponse.json();
  } catch (error) {
    console.error('Error loading clients:', error);
  }

  try {
    const invoiceIdsResponse = await fetch(`${baseUrl}/api/create/invoice`);
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
    const providerResponse = await fetch(`${baseUrl}/api/company`);
    if (!providerResponse.ok) {
      throw new Error(
        `Failed to load provider: ${providerResponse.statusText}`
      );
    }
    provider = await providerResponse.json();
  } catch (error) {
    console.error('Error loading provider:', error);
  }

  return (
    <InvoiceForm
      invoiceIds={invoiceIds}
      products={products}
      provider={provider}
      clients={clients}
    />
  );
});
