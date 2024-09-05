import { StoreUnits } from "../../store/utils/types";
import { IInvoiceIds, InvoiceData, Item } from "./types";

const bankCodes = {
  STSA: { name: "Банка ДСК", swift: "STSABGSF" },
  BNPA: { name: "БНП Париба", swift: "BNPABGSF" },
  FINV: { name: "Първа Инвестиционна Банка", swift: "FINVBGSF" },
  BPBI: { name: "Пощенска Банка", swift: "BPBIBGSF" },
  UNCR: { name: "Уникредит Булбанк", swift: "UNCRBGSF" },
  CECB: { name: "Централна Кооперативна Банка", swift: "CECBBGSF" },
  DEMI: { name: "Търговска Банка Д", swift: "DEMIBGSF" },
  BGUS: { name: "Българо-Американска Кредитна Банка", swift: "BGUSBGSF" },
  BNBG: { name: "Българска Народна Банка", swift: "BNBGBGSF" },
  NASB: { name: "Българска Банка за Развитие", swift: "NASBBGSF" },
  BUIN: { name: "Алианц България", swift: "BUINBGSF" },
  RZBB: { name: "Обединена Българска Банка", swift: "RZBBBGSF" },
  UBBS: { name: "Обединена Българска Банка", swift: "UBBSBGSF" },
};

export const getBankDetailsFromIban = (iban: string) => {
  const error = iban.length !== 22;
  const bankCode = iban.substring(4, 8);
  const bank = bankCodes[bankCode as keyof typeof bankCodes] || undefined;

  return {
    iban,
    name: error ? "" : bank?.name || "",
    swift: error ? "" : bank?.swift || "",
    error,
  };
};

export const calculateItemPrice = (item: Item) => {
  const basePrice = item.price * item.quantity;
  const totalPrice =
    item.unit === StoreUnits.pcs
      ? basePrice
      : basePrice * Number(item.currentPackage);
  return totalPrice.toFixed(2);
};

export const getInvoiceNumber = (data: InvoiceData[]): IInvoiceIds => {
  const proformaInvoices = data.filter((d) => d.type === "proforma");
  const filteredCurrentInvoice = data.filter((d) =>
    d.invoice_id.startsWith("10000"),
  );

  const latestCurrentInvoice = filteredCurrentInvoice.reduce(
    (acc, curr) =>
      Number(acc.invoice_id) > Number(curr.invoice_id) ? acc : curr,
    { invoice_id: "1000000000" },
  );

  const filteredPreviousInvoice = data.filter((d) =>
    d.invoice_id.startsWith("00001"),
  );

  const latestProformaInvoice = proformaInvoices.reduce(
    (acc, curr) =>
      Number(acc.invoice_id) > Number(curr.invoice_id) ? acc : curr,
    { invoice_id: "0000000000" },
  );

  const latestPreviousInvoice = filteredPreviousInvoice.reduce(
    (acc, curr) =>
      Number(acc.invoice_id) > Number(curr.invoice_id) ? acc : curr,
    { invoice_id: "0000000000" },
  );

  const addZeros = (invoice: string) => {
    if (invoice.length !== 10) {
      while (invoice.length < 10) {
        invoice = `0${invoice}`;
      }
    }
    return invoice;
  };

  const current = addZeros(
    (Number(latestCurrentInvoice.invoice_id) + 1).toString(),
  );
  const previous = addZeros(
    (Number(latestPreviousInvoice.invoice_id) + 1).toString(),
  );
  const proforma = addZeros(
    (Number(latestProformaInvoice.invoice_id) + 1).toString(),
  );

  return {
    current,
    previous,
    proforma,
  };
};
