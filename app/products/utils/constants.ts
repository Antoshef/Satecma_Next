import { HeadCell, StoreProduct } from './types';

export const headCells: readonly HeadCell<StoreProduct>[] = [
  {
    id: 'code',
    numeric: true,
    label: 'Код'
  },
  {
    id: 'name',
    numeric: false,
    label: 'Продукт'
  },
  {
    id: 'price',
    numeric: true,
    label: 'Цена кг./л./бр.'
  },
  {
    id: 'packagePrice',
    numeric: true,
    label: 'Цена опаковка'
  },
  {
    id: 'package',
    numeric: true,
    label: 'Опаковка'
  },
  {
    id: 'quantity',
    numeric: true,
    label: 'Количество'
  },
  {
    id: 'totalQuantity',
    numeric: true,
    label: 'Общо'
  }
];
