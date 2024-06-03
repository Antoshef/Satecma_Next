import { fetchData } from "@/utils/fetchData";
import CreatePage from "./page";
import { InvoiceData, Product } from "./invoice/types";
import { getInvoiceNumber } from "./invoice/utils";

export default async function CreateLayout() {
  const data = await fetchData<Product[]>(
    "http://localhost:3000/api/products/get",
  )
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });

  const invoiceIds = await fetchData<InvoiceData[]>(
    "http://localhost:3000/api/create/invoice-sent",
  )
    .then((data) => getInvoiceNumber(data.data))
    .catch((error) => {
      console.error("Error:", error);
      return {
        current: "0000100000",
        previous: "0000000000",
      };
    });

  return (
    <main>
      <CreatePage data={data} invoiceIds={invoiceIds} />
    </main>
  );
}
