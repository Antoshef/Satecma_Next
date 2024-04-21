import { StoreUnits } from "../store/types";

export interface Item
  extends Pick<ProductData, "name" | "code" | "price" | "unit" | "unit_price"> {
  quantity: number;
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
  price: number | null;
  unit_price: number | null;
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
