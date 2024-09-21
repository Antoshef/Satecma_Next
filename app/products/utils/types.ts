export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';
export interface ToastMessage {
  severity: ToastSeverity;
  text?: string;
}

export interface Product {
  code: string;
  name: string;
  package: number;
  category: string;
  unit: string;
  color: string;
  buyPrice: number;
  sellPrice: number;
  percentageIncrease: number;
  quantity: number;
  totalQuantity: number;
}

export interface InvoiceProductData
  extends Pick<Product, 'code' | 'package' | 'quantity' | 'unit'>,
    Pick<Product, 'sellPrice'> {
  totalQuantity: number;
  totalPrice: number;
  description: string;
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
  visible?: boolean;
}

export type Order = 'asc' | 'desc';
