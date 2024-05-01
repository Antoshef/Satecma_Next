import { InvoiceProductData, StoreProductData } from "./types";

export const createKey = (product: StoreProductData) =>
  `${product.code}-${product.name}-${product.package}`;

export const spanishUnitsMap = {
  L: "л.",
  K: "кг.",
  U: "бр.",
};

export const ADDStorage = async (items: InvoiceProductData[]) => {
  try {
    return await fetch("/api/add-storage", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error updating products");
      }
      return { ok: response.ok, data: response.json() };
    });
  } catch (error) {
    console.error("Error updating products: ", error);
    throw new Error("Error updating products");
  }
};
