import { fetchData } from "@/utils/fetchData";
import { StoreProductData } from "./utils/types";
import Store from "./page";

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetchData<StoreProductData[]>(
    "http://localhost:3000/api/storage/get"
  )
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return [];
    });

  return (
    <main>
      <Store data={data} />
    </main>
  );
}
