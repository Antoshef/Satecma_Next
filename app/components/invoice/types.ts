import { StoreUnits } from "../store/types";

export interface Item
  extends Pick<ProductData, "name" | "code" | "price" | "unit" | "packing"> {
  quantity: number;
  currentPackage: string;
  totalPrice: string;
  VAT: string;
  discount: string;
}

export interface ProductData {
  code: number;
  name: string;
  packing: string;
  unit: StoreUnits;
  color: string;
  percentage_increase: number;
  price: number;
  category: string;
}

export enum Providers {
  Satecma = "Сатекма ЕООД",
  Ecohome = "Еко Хоум Трейд ЕООД",
}

export interface Provider {
  name: string;
  eik: number;
  VAT: string;
  city: string;
  address: string;
  director: string;
}
