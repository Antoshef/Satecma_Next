import { StoreProductData } from "./types";

export const createKey = (product: StoreProductData) =>
  `${product.code}-${product.name}-${product.package}`;

export const unitsMapCyrilic = {
  kg: "кг.",
  l: "л.",
  pcs: "бр.",
  m: "м.",
  sqm: "м2",
};
