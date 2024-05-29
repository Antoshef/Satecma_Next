import { fetchData } from "@/utils/fetchData";
import ClientsPage from "./page";
import { Client } from "./utils/types";

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetchData<Client[]>(
    "http://localhost:3000/api/clients/get",
  )
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return [];
    });

  return (
    <main>
      <ClientsPage data={data} />
    </main>
  );
}
