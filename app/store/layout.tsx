import { fetchData } from "@/utils/fetchData";
import Store from "./page";
import { Product } from "@/create/invoice/types";
import { Suspense } from "react";
import Loading from "./loading";

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
      <Suspense fallback={<Loading />}>
        <Store data={data} />
      </Suspense>
    </main>
  );
}
