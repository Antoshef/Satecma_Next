import { Product } from "@/create/invoice/types";
import { StoreProduct, StoreUnits } from "./types";

export const createKey = (product: StoreProduct) =>
  `${product.code}-${product.name}-${product.package}`;

export const spanishUnitsMap = {
  L: "л.",
  K: "кг.",
  U: "бр.",
};

export const handleProductsMap = (data: Product[]) => {
  const result: StoreProduct[] = [];
  for (let i = 0; i < data.length; i++) {
    const currentProduct = data[i];
    const packing = currentProduct.packing.split(",");
    const quantity = currentProduct.quantity.split(",");
    const list: StoreProduct[] = [];
    if (packing.length > 1) {
      for (let j = 0; j < packing.length; j++) {
        list.push({
          code:
            currentProduct.code === "null" || currentProduct.code === ""
              ? "N/A"
              : currentProduct.code,
          name: currentProduct.name,
          package: Number(packing[j]),
          unit: currentProduct.unit,
          category: currentProduct.category,
          quantity: Number(quantity[j]),
          color: currentProduct.color,
          percentage_increase: currentProduct.percentage_increase,
          price: currentProduct.price,
          totalQuantity:
            currentProduct.unit === StoreUnits.pcs
              ? Number(quantity[j])
              : Number(quantity[j]) * Number(packing[j]),
        });
      }
      result.push(...list);
    } else {
      result.push({
        code:
          currentProduct.code === "null" || currentProduct.code === ""
            ? "N/A"
            : currentProduct.code,
        name: currentProduct.name,
        package: Number(packing[0]),
        unit: currentProduct.unit,
        category: currentProduct.category,
        quantity: Number(quantity[0]),
        color: currentProduct.color,
        percentage_increase: currentProduct.percentage_increase,
        price: currentProduct.price,
        totalQuantity:
          currentProduct.unit === StoreUnits.pcs
            ? Number(quantity[0])
            : Number(quantity[0]) * Number(packing[0]),
      });
    }
  }
  return result;
};
