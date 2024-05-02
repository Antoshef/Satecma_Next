import { StoreUnits } from "../../store/utils/types";
import { Company } from "./constants";

export interface Item
  extends Pick<ProductData, "name" | "code" | "price" | "unit" | "packing"> {
  quantity: number;
  currentPackage: string;
  totalPrice: string;
  VAT: string;
  discount: string;
}

export interface ProductData {
  code: string;
  name: string;
  packing: string;
  unit: StoreUnits;
  color: string;
  percentage_increase: number;
  price: number;
  category: string | null;
}

export interface Provider {
  name: Company;
  eik: number;
  VAT: string;
  city: string;
  address: string;
  director: string;
  phone: string;
}

export interface InvoiceData {
  client: string;
  eik: number;
  vat_number: string;
  date: string;
  invoice_id: string;
  amount: number;
  vat: number;
  total: number;
}

export interface LatestInvoices {
  current: string;
  previous: string;
  manual: string;
}

export enum InvoiceType {
  current = "Текущ номер",
  previous = "Предходен номер",
  manual = "Въведи номер",
}
