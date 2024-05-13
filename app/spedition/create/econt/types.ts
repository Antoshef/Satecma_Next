import { Address, City, Office } from "./services/shipments/types";

export interface Sender {
  name: string;
  city: City;
  office: Office;
  currentCityOffices: Office[];
}

export interface Receiver {
  name: string;
  phone: string;
  country: string;
  city: City;
  email: string;
  office: Office;
  address?: Address;
  currentCityOffices: Office[];
}

export interface Package {
  quantity: number | string;
  weight: number | string;
  type: string;
  dimensions: {
    width: number | string;
    height: number | string;
    length: number | string;
  };
  description: string;
  id: string;
  isFragile: boolean;
  volume: number | string;
  isLessThan60cm: boolean;
}

export interface AdditionalServices {
  price: number | string;
  cashOnDelivery: {
    payer: string;
    amount: number | string;
  };
  paymentType: string;
  twoWayDelivery: boolean;
  SMSNotification: boolean;
  coolingBag: boolean;
  invoiceId: string;
  stretchFoil: boolean;
  borrowPallet: boolean;
  stretchFoilPacking: boolean;
}
