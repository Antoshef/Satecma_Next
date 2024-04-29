export interface StoreProductData {
  code: number;
  category: string;
  name: string;
  quantity: number;
  package: number;
  unit: StoreUnits;
  total: number;
}

export enum StoreUnits {
  kg = "kg",
  l = "l",
  pcs = "pcs",
  m = "m",
  sqm = "sqm",
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof StoreProductData;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";
