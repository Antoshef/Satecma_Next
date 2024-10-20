import { Company, DocumentType, InvoiceData } from '@/create/invoice/types';
import { OfferData } from '@/create/offer/types';

export interface DocumentRequest {
  email: string;
  documentNumber: string;
  html: string;
  css: string;
  sendMailToRecepient: boolean;
  documentType: DocumentType;
  provider: Company;
  clientName: string;
  heading?: string;
}

export interface DocumentRequestBody {
  documentRequest: DocumentRequest;
  invoiceData?: InvoiceData;
  offerData?: OfferData;
}
