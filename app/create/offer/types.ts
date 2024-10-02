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
