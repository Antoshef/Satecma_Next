import { Product } from "@/create/invoice/types";
import { fetchData } from "@/utils/fetchData";
import { Suspense } from "react";
import Store from "./page";

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetchData<Product[]>(
    "http://localhost:3000/api/products/get",
  )
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return [];
    });

  return (
    <main>
      <Suspense>
        <Store data={data} />
      </Suspense>
    </main>
  );
}
