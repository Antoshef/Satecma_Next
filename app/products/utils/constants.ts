import { HeadCell, Product } from './types';

export const headCells: readonly HeadCell<Product>[] = [
  {
    id: 'code',
    numeric: true,
    label: 'Код',
    visible: true
  },
  {
    id: 'name',
    numeric: false,
    label: 'Име',
    visible: true
  },
  {
    id: 'packing',
    numeric: true,
    label: 'Опаковка',
    visible: true
  },
  {
    id: 'unit',
    numeric: false,
    label: 'Единица',
    visible: true
  },
  {
    id: 'quantity',
    numeric: true,
    label: 'Количество',
    visible: true
  },
  {
    id: 'color',
    numeric: false,
    label: 'Цвят',
    visible: true
  },
  {
    id: 'buyPrice',
    numeric: true,
    label: 'Цена на покупка',
    visible: true
  },
  {
    id: 'percentageIncrease',
    numeric: true,
    label: 'Процентно увеличение',
    visible: true
  },
  {
    id: 'sellPrice',
    numeric: true,
    label: 'Продажна цена',
    visible: true
  },
  {
    id: 'category',
    numeric: false,
    label: 'Категория',
    visible: true
  }
];
