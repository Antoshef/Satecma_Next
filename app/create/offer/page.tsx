import { fetchData } from "@/utils/fetchData";
import { Product, Provider } from "../invoice/types";
import { OfferBox } from "./offerBox";

async function OfferPage() {
  const provider = await fetchData<Provider>(
    "http://localhost:3000/api/profile/get",
  ).then((res) => res.data);

  const products = await fetchData<Product[]>(
    "http://localhost:3000/api/products/get",
  )
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });

  return (
    <div>
      <OfferBox products={products} provider={provider} />
    </div>
  );
}

export default OfferPage;
