import { InvoiceData, InvoiceReceiver, InvoiceType, Provider } from "./types";

export const SATECMA_LOGO =
  "http://satecma.bg/wp-content/uploads/2024/04/main-logo-dark.png";

export enum Company {
  satecma = "Сатекма ЕООД",
  ekoHome = "Еко Хоум Трейд ЕООД",
}

export const SATECMA_COMPANY: Provider = {
  name: Company.satecma,
  eik: 207756461,
  VAT: "BG207756461",
  city: "Ямбол, България",
  address: "ул. Феризович №17",
  director: "Антон Станев",
  phone: "0886 858 601",
  bankDetails: {
    iban: "BG16BPBI79341038837501",
    swift: "BPBIBGSF",
    name: "Юробанк България АД",
  },
};

export const ECOHOME_COMPANY: Provider = {
  name: Company.ekoHome,
  eik: 205711987,
  VAT: "BG205711987",
  city: "София, България",
  address: "р-н Овча купел, ул.641-ва №2",
  director: "Атанас Караджов",
  phone: "0882 347 253",
  bankDetails: {
    iban: "BG79FINV91501017339942",
    swift: "FINVBGSF",
    name: "Първа Инвестиционна Банка",
  },
};

export const INVOICE_DATA_DEFAULT_VALUES: InvoiceData = {
  amount: 0,
  client: "",
  date: new Date().toISOString().split("T")[0],
  eik: 0,
  invoice_id: "",
  total: 0,
  vat: 0,
  vat_number: "",
  type: InvoiceType.proforma,
};

export const INIT_RECEIVER: InvoiceReceiver = {
  email: "",
  phone: "",
  company: "",
  city: "",
  address: "",
  EIK: "",
  VAT: "",
  director: "",
};
