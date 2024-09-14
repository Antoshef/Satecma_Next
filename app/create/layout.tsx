import { fetchData } from "@/utils/fetchData";
import { InvoiceData, Product, Company } from "./invoice/types";
import { getInvoiceNumber } from "./invoice/utils";
import { Client } from "@/clients/utils/types";
import { cloneElement } from "react";

export default async function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  const products = await fetchData<Product[]>(
    "http://localhost:3000/api/products/get",
  )
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });

  const clients = await fetchData<Client[]>("http://localhost:3000/api/clients")
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return [];
    });

  const invoiceIds = await fetchData<InvoiceData[]>(
    `http://localhost:3000/api/create/invoice`,
  )
    .then((data) => getInvoiceNumber(data.data))
    .catch((error) => {
      console.error("Error:", error);
      return {
        current: "1000000000",
        previous: "0000100000",
        proforma: "0000000000",
      };
    });

  // const provider = await fetchData<Company>(
  //   "http://localhost:3000/api/company",
  // ).then((res) => res.data);

  const provider: Company = {
    name: "Сатекма",
    city: "София",
    address: "ул. Люлин 33",
    eik: 123456789,
    VAT: "BG123456789",
    director: "Стефан Стефанов",
    phone: "0888888888",
    iban: "BG123456789",
    swift: "SWIFT",
    bankName: "Банка",
  };

  return (
    <article>
      {cloneElement(children, {
        products,
        clients,
        invoiceIds,
        provider,
      })}
    </article>
  );
}
