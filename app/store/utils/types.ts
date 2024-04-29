import { ProductData } from "@/invoice/invoiceBox/types";

export interface StoreProductData {
  code: string;
  category: string;
  name: string;
  quantity: number;
  package: number;
  unit: StoreUnits;
  total: number;
}

export interface InvoiceProductData
  extends Pick<StoreProductData, "code" | "package" | "quantity">,
    Pick<ProductData, "price"> {}

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

export interface ProductRowsData {
  quantity: number;
  price: number;
  code: string;
  package: number;
}
