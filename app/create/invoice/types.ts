import { StoreUnits } from "../../store/utils/types";

export interface Item
  extends Pick<Product, "name" | "code" | "price" | "unit" | "packing"> {
  quantity: number;
  currentPackage: number;
  totalPrice: string;
  VAT: string;
  discount: number;
}

export interface Product {
  code: string;
  name: string;
  packing: string;
  unit: StoreUnits;
  color: string;
  percentage_increase: number;
  price: number;
  category: string;
  quantity: string;
}

export interface Provider {
  name: string;
  eik: number;
  VAT: string;
  city: string;
  address: string;
  director: string;
  phone: string;
  bankDetails: BankDetails;
}

export interface InvoiceReceiver {
  email: string;
  phone?: string;
  company: string;
  city: string;
  address: string;
  EIK: string;
  VAT: string;
  director: string;
}

interface BankDetails {
  iban: string;
  swift: string;
  name: string;
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
  type: InvoiceType;
}

export type IInvoiceIds = Pick<
  LatestInvoices,
  "current" | "previous" | "proforma"
>;

export interface LatestInvoices {
  current: string;
  previous: string;
  proforma: string;
  manual: string;
}

export enum InvoiceIdType {
  current = "Текущ номер",
  previous = "Предходен номер",
  proforma = "Текущ номер",
  manual = "Въведи номер",
}

export enum InvoiceType {
  original = "original",
  proforma = "proforma",
}
