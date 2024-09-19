import { Client } from '@/clients/utils/types';
import { StoreUnits } from '@/products/utils/types';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import InvoiceBox from './invoiceBox';
import { Company, Product } from './types';

// Mock data
const mockProducts: Product[] = [
  {
    code: 'P001',
    name: 'Product 1',
    packing: 'Box',
    unit: StoreUnits.kg,
    color: 'Red',
    percentage_increase: 10,
    price: 10.0,
    category: 'Category 1',
    quantity: '100'
  },
  {
    code: 'P002',
    name: 'Product 2',
    packing: 'Box',
    unit: StoreUnits.kg,
    color: 'Blue',
    percentage_increase: 15,
    price: 20.0,
    category: 'Category 2',
    quantity: '200'
  },
  {
    code: 'P003',
    name: 'Product 3',
    packing: 'Box',
    unit: StoreUnits.kg,
    color: 'Green',
    percentage_increase: 20,
    price: 30.0,
    category: 'Category 3',
    quantity: '300'
  }
];

const mockClients: Client[] = [
  {
    name: 'Client 1',
    city: 'City 1',
    address: 'Address 1',
    eik: 'EIK001',
    vat: 'VAT001',
    director: 'Director 1',
    email: 'client1@example.com',
    phone: '123-456-7890'
  },
  {
    name: 'Client 2',
    city: 'City 2',
    address: 'Address 2',
    eik: 'EIK002',
    vat: 'VAT002',
    director: 'Director 2',
    email: 'client2@example.com',
    phone: '123-456-7891'
  },
  {
    name: 'Client 3',
    city: 'City 3',
    address: 'Address 3',
    eik: 'EIK003',
    vat: 'VAT003',
    director: 'Director 3',
    email: 'client3@example.com',
    phone: '123-456-7892'
  }
];

const mockInvoiceIds = {
  original: '1000000001',
  proforma: '1000000002'
};

const mockProvider: Company = {
  name: 'Provider Company',
  eik: 123456789,
  VAT: 'BG123456789',
  city: 'Sofia',
  address: '123 Main St',
  director: 'John Doe',
  phone: '123-456-7890',
  bankName: 'Bank Name',
  swift: 'SWIFT123',
  iban: 'BG12345678901234567890'
};

export default withPageAuthRequired(async function InvoicePage() {
  // const products = await fetch(`${baseUrl}/api/products/get`)
  //   .then((res) => res.json())
  //   .catch((error) => {
  //     console.error('Error:', error);
  //     return [];
  //   });

  // const clients = await fetch(`${baseUrl}/api/clients`)
  //   .then((data) => data.json())
  //   .catch((error) => {
  //     console.error(error);
  //     return [];
  //   });

  // const invoiceIds = await fetch(`${baseUrl}/api/create/invoice`)
  //   .then(async (data) => getInvoiceNumber(await data.json()))
  //   .catch((error) => {
  //     console.error('Error:', error);
  //     return {
  //       current: '1000000000',
  //       previous: '0000100000',
  //       proforma: '0000000000'
  //     };
  //   });

  // const provider = await fetch(`${baseUrl}/api/company`).then((res) =>
  //   res.json()
  // );
  const products = mockProducts;
  const clients = mockClients;
  const invoiceIds = mockInvoiceIds;
  const provider = mockProvider;

  return (
    <InvoiceBox
      invoiceIds={invoiceIds}
      products={products}
      provider={provider}
      clients={clients}
    />
  );
});
