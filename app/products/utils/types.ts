export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';
export interface ToastMessage {
  severity: ToastSeverity;
  text?: string;
}

export interface Product {
  code: string;
  product_uuid?: string;
  id?: number;
  user_id?: string;
  name: string;
  unit: string;
  packing: number;
  quantity: number;
  color?: string;
  buyPrice?: number;
  percentageIncrease?: number;
  sellPrice: number;
  category?: string;
}

export interface InvoiceProductData
  extends Pick<
      Product,
      'product_uuid' | 'packing' | 'quantity' | 'unit' | 'user_id'
    >,
    Pick<Product, 'sellPrice'> {
  totalQuantity: number;
  totalPrice: number;
  description: string;
}

export enum EnhancedMode {
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
