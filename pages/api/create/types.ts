export interface InvoiceRequestBody {
  email: string;
  invoiceNumber: string;
  html: string;
  css: string;
  sendMailToRecepient: boolean;
  invoiceType: string;
  providerName: string;
  client: string;
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
  providerName: string;
  client: string;
  heading?: string;
}
