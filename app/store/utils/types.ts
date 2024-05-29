import { Product } from "@/create/invoice/types";
import { AlertProps } from "@mui/material";

export interface ToastMessage {
  severity: AlertProps["severity"];
  text?: string;
}

export type StoreProduct = {
  code: string;
  package: number;
  packagePrice: number;
  quantity: number;
  totalQuantity: number;
} & Pick<
  Product,
  "category" | "color" | "name" | "percentage_increase" | "price" | "unit"
>;

export interface InvoiceProductData
  extends Pick<StoreProduct, "code" | "package" | "quantity" | "unit">,
    Pick<Product, "price"> {
  totalQuantity: number;
  totalPrice: number;
  description: string;
}

export enum StoreUnits {
  kg = "кг.",
  l = "л.",
  pcs = "бр.",
}

export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";

export enum SpanishUnits {
  LITER = "L",
  KILOGRAM = "K",
  UNIT = "U",
}
