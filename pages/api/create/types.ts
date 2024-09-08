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
