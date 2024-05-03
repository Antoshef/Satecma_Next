import { InvoiceData, Provider } from "./types";

export const SATECMA_LOGO =
  "https://satecma.bg/wp-content/uploads/2024/02/logo-satecma-industrias.png";

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
};

export const ECOHOME_COMPANY: Provider = {
  name: Company.ekoHome,
  eik: 205711987,
  VAT: "BG205711987",
  city: "София, България",
  address: "р-н Овча купел, ул.641-ва №2",
  director: "Атанас Караджов",
  phone: "0882 347 253",
};

export const INVOICE_DATA_DEFAULT_VALUES: InvoiceData = {
  amount: 0,
  client: "",
  date: new Date().toLocaleDateString("bg-BG", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "Europe/Sofia",
  }),
  eik: 0,
  invoice_id: "",
  total: 0,
  vat: 0,
  vat_number: "",
};
