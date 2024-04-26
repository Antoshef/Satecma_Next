import { StoreUnits } from "../store/types";

export interface Item
  extends Pick<ProductData, "name" | "code" | "price" | "unit" | "packing"> {
  quantity: number;
  currentPackage: string;
  totalPrice: string;
  VAT: string;
  discount: string;
}

export interface ProductData {
  code: number;
  name: string;
  packing: string;
  unit: StoreUnits;
  color: string;
  percentage_increase: number;
  price: number;
  category: string;
}

export interface Provider {
  name: string;
  eik: number;
  VAT: string;
  city: string;
  address: string;
  director: string;
}

export interface InvoiceData {
  client: string;
  eik: number;
  vat_number: string;
  date: string;
  invoice_id: number;
  amount: number;
  vat: number;
  total: number;
}
