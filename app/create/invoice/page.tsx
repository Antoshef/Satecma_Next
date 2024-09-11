import { fetchData } from "@/utils/fetchData";
import { Product, Company, InvoiceData } from "../invoice/types";
import { Client } from "@/clients/utils/types";
import InvoiceBox from "./invoiceBox";
import { getInvoiceNumber } from "./utils";

async function InvoicePage() {
  const products = await fetchData<Product[]>("/api/products/get")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });

  const clients = await fetchData<Client[]>("/api/clients")
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return [];
    });

  const invoiceIds = await fetchData<InvoiceData[]>(`/api/create/invoice`)
    .then((data) => getInvoiceNumber(data.data))
    .catch((error) => {
      console.error("Error:", error);
      return {
        current: "1000000000",
        previous: "0000100000",
        proforma: "0000000000",
      };
    });

  const provider = await fetchData<Company>("/api/company").then(
    (res) => res.data,
  );

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
