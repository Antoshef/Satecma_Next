import { StoreUnits } from "../../store/utils/types";
import { Company } from "./constants";
import { InvoiceData, Item } from "./types";

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
    error: iban.length !== 22,
  };
};

export const calculateItemPrice = (item: Item) => {
  const totalPrice =
    item.unit === StoreUnits.pcs
      ? item.price * item.quantity
      : item.price * item.quantity * Number(item.currentPackage);
  return totalPrice.toFixed(2);
};

export const getInvoiceNumber = (data: InvoiceData[]) => {
  const filteredCurrentInvoice = data.filter((d) =>
    d.invoice_id.startsWith("00001")
  );

  const latestCurrentInvoice = filteredCurrentInvoice.reduce(
    (acc, curr) =>
      Number(acc.invoice_id) > Number(curr.invoice_id) ? acc : curr,
    { invoice_id: "0000100000" }
  );

  const filteredPreviousInvoice = data.filter((d) =>
    d.invoice_id.startsWith("00000")
  );

  const latestPreviousInvoice = filteredPreviousInvoice.reduce(
    (acc, curr) =>
      Number(acc.invoice_id) > Number(curr.invoice_id) ? acc : curr,
    { invoice_id: "0000000000" }
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
    (Number(latestCurrentInvoice.invoice_id) + 1).toString()
  );
  const previous = addZeros(
    (Number(latestPreviousInvoice.invoice_id) + 1).toString()
  );

  return {
    current,
    previous,
  };
};

export const generateBcc = ({
  accountantCopy,
  officeCopy,
  providerName,
}: {
  accountantCopy?: boolean;
  officeCopy?: boolean;
  providerName?: Company;
}) => {
  const bcc = [];
  if (accountantCopy) {
    bcc.push(
      providerName === Company.satecma
        ? process.env.NEXT_PUBLIC_SATECMA_ACCOUNTANT_EMAIL
        : providerName === Company.ekoHome
        ? process.env.NEXT_PUBLIC_ECO_HOME_ACCOUNTANT_EMAIL
        : ""
    );
  }
  if (officeCopy) {
    bcc.push(process.env.NEXT_PUBLIC_OFFICE_EMAIL);
  }
  return bcc;
};

export const POSTinvoicePdf = async (
  bcc: string[],
  email: string,
  invoiceNumber: string,
  html: string | undefined,
  css: string
) =>
  await fetch("/api/generate-invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bcc,
      email,
      invoiceNumber,
      html,
      css,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      throw new Error(error);
    });

export const POSTofferPdf = async (
  bcc: string[],
  email: string,
  name: string,
  html: string | undefined,
  css: string
) =>
  await fetch("/api/generate-offer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bcc,
      email,
      name,
      html,
      css,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      throw new Error(error);
    });

export const POSTinvoiceData = async (invoiceData: InvoiceData) =>
  await fetch("/api/sent-invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });

export const UPDATEstoreData = async (items: Item[]) =>
  await fetch("/api/update-storage", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
