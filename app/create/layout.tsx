import { fetchData } from "@/utils/fetchData";
import { InvoiceData, ProductData } from "./invoice/types";
import { getInvoiceNumber } from "./invoice/utils";
import CreatePage from "./page";

export default async function CreateLayout() {
  const data = await fetchData<ProductData[]>(
    "http://localhost:3000/api/get-prices"
  )
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });

  const invoiceIds = await fetchData<InvoiceData[]>(
    "http://localhost:3000/api/create/invoice-sent"
  )
    .then((data) => getInvoiceNumber(data.data))
    .catch((error) => {
      console.error("Error:", error);
      return {
        current: "0000100000",
        previous: "0005000000",
      };
    });

  return (
    <main>
      <CreatePage data={data} invoiceIds={invoiceIds} />
    </main>
  );
}