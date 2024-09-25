import { Product } from '@/products/utils/types';

export interface Item
  extends Pick<
    Product,
    'name' | 'code' | 'sellPrice' | 'unit' | 'packing' | 'quantity'
  > {
  totalPrice: number;
  vat: number;
  discount: number;
  rowIndex?: number;
}

export interface Company {
  name: string;
  eik: number;
  vat: string;
  city: string;
  address: string;
  director: string;
  phone: string;
  iban: string;
  swift: string;
  bankName: string;
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

export enum InvoiceType {
  none = 'none',
  original = 'original',
  proforma = 'proforma'
}

export interface InvoiceError {
  invoiceNumber: boolean;
  wordPrice: boolean;
  invoiceType: boolean;
}
