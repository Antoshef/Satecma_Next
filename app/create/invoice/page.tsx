import { fetchData } from "@/utils/fetchData";
import { Product, Provider, InvoiceData } from "../invoice/types";
import { Client } from "@/clients/utils/types";
import InvoiceBox from "./invoiceBox";
import { getInvoiceNumber } from "./utils";
import { Company } from "./constants";

async function InvoicePage() {
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

  const provider = await fetchData<Provider>(
    "http://localhost:3000/api/profile/get",
  ).then((res) => res.data);

  return (
    <InvoiceBox
      invoiceIds={invoiceIds}
      products={products}
      provider={provider}
      clients={clients}
    />
  );
}

export default InvoicePage;
