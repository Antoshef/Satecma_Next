import { Item } from '../invoice/types';

export interface OfferMetaData {
  provider: string | null;
  recipient: {
    name: string;
    phone: string;
    email: string;
  };
  offerNumber: string;
  items: Item[];
  total: {
    amountWithoutDiscount: number;
    discount: number;
    netAmount: number;
    vat: number;
    paid: number;
  };
  heading: string;
  sendMailToRecepient: boolean;
  date: string;
}

export interface OfferData {
  clientName: string;
  date: string;
  offer_id: string;
  amount: number;
  vat: number;
  total: number;
  type: DocumentType;
  file_path?: string;
}
