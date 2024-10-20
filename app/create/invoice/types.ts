import { Client } from '@/clients/utils/types';
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
  clientName: string;
  eik: number;
  vat_number: string;
  date: string;
  invoice_id: string;
  amount: number;
  vat: number;
  total: number;
  type: DocumentType;
  file_path?: string;
}

export enum DocumentType {
  none = 'none',
  original = 'invoice-original',
  proforma = 'invoice-proforma',
  offer = 'offer'
}

export interface InvoiceError {
  invoiceNumber: boolean;
  wordPrice: boolean;
  invoiceType: boolean;
}

export interface InvoiceMetaData {
  provider: Company | null;
  receiver: Client;
  invoiceNumber: string;
  invoiceType: DocumentType;
  items: Item[];
  total: {
    amountWithoutDiscount: number;
    discount: number;
    netAmount: number;
    vat: number;
    paid: number;
  };
  wordPrice: string;
  reason: string;
  paymentMethod: string;
  email: string;
  sendMailToRecepient: boolean;
  date: string;
}
