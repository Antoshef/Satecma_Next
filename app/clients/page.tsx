import { fetchData } from "@/utils/fetchData";
import ClientsTable from "./clientsTable";
import { Client } from "./utils/types";

export default async function ClientsPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetchData<Client[]>("http://localhost:3000/api/clients")
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return [];
    });

  return (
    <section>
      <ClientsTable data={data} />
    </section>
  );
}
