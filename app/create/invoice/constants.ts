import { Client } from '@/clients/utils/types';
import { InvoiceData, InvoiceType, Company } from './types';
import { Product } from '@/products/utils/types';
export const VAT_PREFIX = 'BG';
export const SATECMA_LOGO =
  'https://satecma.bg/wp-content/uploads/2024/04/main-logo-dark.png';

export const SATECMA_COMPANY: Company = {
  name: 'Сатекма ЕООД',
  eik: 207756461,
  vat: 'BG207756461',
  city: 'Ямбол, България',
  address: 'ул. Феризович №17',
  director: 'Антон Станев',
  phone: '0886 858 601',
  iban: 'BG16BPBI79341038837501',
  swift: 'BPBIBGSF',
  bankName: 'Юробанк България АД'
};

export const ECOHOME_COMPANY: Company = {
  name: 'Еко Хоум Трейд ЕООД',
  eik: 205711987,
  vat: 'BG205711987',
  city: 'София, България',
  address: 'р-н Овча купел, ул.641-ва №2',
  director: 'Атанас Караджов',
  phone: '0882 347 253',
  iban: 'BG79FINV91501017339942',
  swift: 'FINVBGSF',
  bankName: 'Първа Инвестиционна Банка'
};

export const INVOICE_DATA_DEFAULT_VALUES: InvoiceData = {
  amount: 0,
  client: '',
  date: new Date().toISOString().split('T')[0],
  eik: 0,
  invoice_id: '',
  total: 0,
  vat: 0,
  vat_number: '',
  type: InvoiceType.proforma
};

export const INIT_PROVIDER: Company = {
  name: '',
  eik: 0,
  vat: '',
  city: '',
  address: '',
  director: '',
  phone: '',
  bankName: '',
  iban: '',
  swift: ''
};

export const INIT_RECEIVER: Client = {
  email: '',
  phone: '',
  name: '',
  city: '',
  address: '',
  eik: '',
  vat: '',
  director: ''
};

// Mock data for Product
const mockProducts: Product[] = [
  {
    code: 'P001',
    name: 'Product 1',
    unit: 'pcs',
    packing: 10,
    quantity: 100,
    sellPrice: 50,
    category: 'Category 1'
  },
  {
    code: 'P002',
    name: 'Product 2',
    unit: 'pcs',
    packing: 20,
    quantity: 200,
    sellPrice: 100,
    category: 'Category 2'
  }
];

// Mock data for Client
const mockClients: Client[] = [
  {
    name: 'Client 1',
    city: 'City 1',
    address: 'Address 1',
    eik: '123456789',
    vat: 'BG123456789',
    director: 'Director 1',
    email: 'client1@example.com',
    phone: '123-456-7890'
  },
  {
    name: 'Client 2',
    city: 'City 2',
    address: 'Address 2',
    eik: '987654321',
    vat: 'BG987654321',
    director: 'Director 2',
    email: 'client2@example.com',
    phone: '098-765-4321'
  }
];

// Mock data for InvoiceData
const mockInvoiceData: InvoiceData[] = [
  {
    client: 'Client 1',
    eik: 123456789,
    vat_number: 'BG123456789',
    date: '2023-10-01',
    invoice_id: 'INV001',
    amount: 500,
    vat: 100,
    total: 600,
    type: InvoiceType.original
  },
  {
    client: 'Client 2',
    eik: 987654321,
    vat_number: 'BG987654321',
    date: '2023-10-02',
    invoice_id: 'INV002',
    amount: 1000,
    vat: 200,
    total: 1200,
    type: InvoiceType.proforma
  }
];

// Mock data for Company
const mockProvider: Company = {
  name: 'Provider Company',
  eik: 123456789,
  vat: 'BG123456789',
  city: 'Provider City',
  address: 'Provider Address',
  director: 'Provider Director',
  phone: '123-456-7890',
  iban: 'BG12STSA12345678901234',
  swift: 'STSABGSF',
  bankName: 'Provider Bank'
};

// Mock data for Invoice IDs
const mockInvoiceIds: string[] = mockInvoiceData.map((item) => item.invoice_id);

export {
  mockProducts,
  mockClients,
  mockInvoiceData,
  mockProvider,
  mockInvoiceIds
};
