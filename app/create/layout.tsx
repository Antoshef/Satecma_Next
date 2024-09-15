import { baseUrl } from '@/constants';
import { Company } from './invoice/types';
import { getInvoiceNumber } from './invoice/utils';
import { cloneElement } from 'react';

export default async function CreateLayout({
  children
}: Readonly<{
  children: React.ReactElement;
}>) {
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

  const provider: Company = {
    name: 'Сатекма',
    city: 'София',
    address: 'ул. Люлин 33',
    eik: 123456789,
    VAT: 'BG123456789',
    director: 'Стефан Стефанов',
    phone: '0888888888',
    iban: 'BG123456789',
    swift: 'SWIFT',
    bankName: 'Банка'
  };

  return (
    <article>
      {cloneElement(children, {
        products,
        clients,
        invoiceIds,
        provider
      })}
    </article>
  );
}
