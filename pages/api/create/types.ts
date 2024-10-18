import { Company } from '@/create/invoice/types';

export interface InvoiceRequestBody {
  email: string;
  invoiceNumber: string;
  html: string;
  css: string;
  sendMailToRecepient: boolean;
  invoiceType: string;
  provider: Company;
  clientName: string;
}

export interface OfferRequestBody {
  email: string;
  name: string;
  html: string;
  css: string;
  providerName: string;
  heading: string;
}

export interface DocumentRequestBody {
  email: string;
  name: string;
  html: string;
  css: string;
  sendMailToRecepient: boolean;
  documentType: 'invoice' | 'offer';
  invoiceNumber: string;
  provider: Company;
  clientName: string;
  heading?: string;
}
