import { Product } from '@/create/invoice/types';

export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';
export interface ToastMessage {
  severity: ToastSeverity;
  text?: string;
}

export type StoreProduct = {
  package: number;
  packagePrice: number;
  quantity: number;
  totalQuantity: number;
} & Pick<
  Product,
  | 'category'
  | 'color'
  | 'name'
  | 'percentage_increase'
  | 'price'
  | 'unit'
  | 'code'
>;

export interface InvoiceProductData
  extends Pick<StoreProduct, 'code' | 'package' | 'quantity' | 'unit'>,
    Pick<Product, 'price'> {
  totalQuantity: number;
  totalPrice: number;
  description: string;
}

export enum StoreUnits {
  kg = 'кг.',
  l = 'л.',
  pcs = 'бр.'
}

export enum EncancedMode {
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  None = 'none'
}

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
  centered?: boolean;
}

export type Order = 'asc' | 'desc';

export enum SpanishUnits {
  LITER = 'L',
  KILOGRAM = 'K',
  UNIT = 'U'
}
