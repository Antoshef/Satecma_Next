import { HeadCell } from '@/products/utils/types';
import { Client } from './types';

export const headCells: readonly HeadCell<Client>[] = [
  {
    id: 'name',
    numeric: false,
    label: 'Име'
  },
  { id: 'phone', numeric: false, label: 'Телефон' },
  { id: 'email', numeric: false, label: 'Имейл' },
  { id: 'city', numeric: false, label: 'Град' },
  { id: 'address', numeric: false, label: 'Адрес' },
  {
    id: 'director',
    numeric: false,
    label: 'Директор'
  },
  {
    id: 'eik',
    numeric: true,
    label: 'ЕИК'
  },
  {
    id: 'vat',
    numeric: false,
    label: 'ДДС'
  }
];
