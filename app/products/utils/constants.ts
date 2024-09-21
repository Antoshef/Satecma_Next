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
    label: 'Наименувание',
    visible: true
  },
  {
    id: 'sellPrice',
    numeric: true,
    label: 'Продажна цена',
    visible: true
  },
  {
    id: 'package',
    numeric: true,
    label: 'Опаковка',
    visible: true
  },
  {
    id: 'quantity',
    numeric: true,
    label: 'Количество',
    visible: true
  },
  {
    id: 'totalQuantity',
    numeric: true,
    label: 'Общо',
    visible: true
  },
  {
    id: 'category',
    numeric: false,
    label: 'Категория',
    visible: true
  },
  {
    id: 'color',
    numeric: false,
    label: 'Цвят',
    visible: true
  },
  {
    id: 'percentageIncrease',
    numeric: true,
    label: 'Процентно увеличение',
    visible: true
  },
  {
    id: 'buyPrice',
    numeric: true,
    label: 'Цена на покупка',
    visible: true
  },
  {
    id: 'unit',
    numeric: false,
    label: 'Единица',
    visible: true
  }
];
