import { fetchData } from "@/utils/fetchData";
import { Create } from "./Create";
import { Company } from "./invoice/constants";
import { InvoiceData, Product } from "./invoice/types";
import { getInvoiceNumber } from "./invoice/utils";
import { Client } from "@/clients/utils/types";

export default async function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await fetchData<Product[]>(
    "http://localhost:3000/api/products/get",
  )
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });

  const clients = await fetchData<Client[]>(
    "http://localhost:3000/api/clients/get",
  )
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return [];
    });

  const invoiceIds = await fetchData<InvoiceData[]>(
    `http://localhost:3000/api/create/invoice-sent?company=${Company.satecma}`,
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

  return (
    <main>
      <Create products={products} clients={clients} invoiceIds={invoiceIds} />
      {children}
    </main>
  );
}
