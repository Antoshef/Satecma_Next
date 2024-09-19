import { StoreUnits } from '../../products/utils/types';

export interface Item
  extends Pick<Product, 'name' | 'code' | 'price' | 'unit' | 'packing'> {
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

export interface Company {
  name: string;
  eik: number;
  VAT: string;
  city: string;
  address: string;
  director: string;
  phone: string;
  iban: string;
  swift: string;
  bankName: string;
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
  file_path?: string;
}

export interface LatestInvoices {
  original: string;
  proforma: string;
}

export enum InvoiceIdType {
  current = 'Текущ номер',
  previous = 'Предходен номер',
  proforma = 'Текущ номер',
  manual = 'Въведи номер'
}

export enum InvoiceType {
  original = 'original',
  proforma = 'proforma'
}
