import { StoreProductData } from "./types";

export const createKey = (product: StoreProductData) =>
  `${product.code}-${product.name}-${product.package}`;

export const spanishUnitsMap = {
  L: "л.",
  K: "кг.",
  U: "бр.",
};
