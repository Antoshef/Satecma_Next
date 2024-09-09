import { fetchData } from "@/utils/fetchData";
import InvoicesTable from "./invoicesTable";
import { InvoiceData } from "@/create/invoice/types";

async function InvoicesPage() {
  const invoices = await fetchData<InvoiceData[]>(
    "http://localhost:3000/api/create/invoice",
  )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return [];
    });

  return (
    <div>
      <h1>Invoices</h1>
      <InvoicesTable data={invoices} />
    </div>
  );
}

export default InvoicesPage;
