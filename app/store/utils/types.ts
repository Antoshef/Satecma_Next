import { ProductData } from "@/invoice/invoiceBox/types";
import { AlertProps } from "@mui/material";

export interface StoreProductData {
  code: string;
  category: string;
  name: string;
  quantity: number;
  package: number;
  unit: StoreUnits;
  total: number;
}

export interface ToastMessage {
  severity: AlertProps["severity"];
  text?: string;
}

export interface InvoiceProductData
  extends Pick<StoreProductData, "code" | "package" | "quantity" | "unit">,
    Pick<ProductData, "price"> {
  totalQuantity: number;
  totalPrice: number;
  description: string;
}

export enum StoreUnits {
  kg = "кг.",
  l = "л.",
  pcs = "бр.",
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof StoreProductData;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";

export enum SpanishUnits {
  LITER = "L",
  KILOGRAM = "K",
  UNIT = "U",
}
