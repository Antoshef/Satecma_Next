import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { StoreUnits } from "../../store/utils/types";
import { Company } from "./constants";
import { InvoiceData, InvoiceType, Item } from "./types";

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
        ? process.env.NEXT_PUBLIC_SATECMA_ACCOUNTANT_EMAIL || ""
        : providerName === Company.ekoHome
        ? process.env.NEXT_PUBLIC_ECO_HOME_ACCOUNTANT_EMAIL || ""
        : ""
    );
  }
  if (officeCopy) {
    bcc.push(process.env.NEXT_PUBLIC_OFFICE_EMAIL || "");
  }
  return bcc.filter((email) => email !== "");
};

export const POSTofferPdf = async ({
  bcc,
  css,
  email,
  html,
  name,
  providerName,
}: {
  bcc: string[];
  email: string;
  name: string;
  html: string | undefined;
  css: string;
  providerName: string;
}) => {
  try {
    const response = await fetch("/api/create/offer", {
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
        providerName,
      }),
    });

    if (!response.ok) {
      // Check if the response status is not in the success range
      const errorData = await response.json(); // Assuming the server sends back a JSON with error info
      const errorMessage = errorData.message || "Something went wrong";
      throw new Error(errorMessage + ` (Status ${response.status})`);
    }

    // If the response is okay, parse it as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // In real-world applications, you might want to handle this differently
    // For example, you might log these errors or show user-friendly messages
    throw new Error(
      `Failed to post offer PDF: ${
        (error as any).message || (error as any).toString()
      }`
    );
  }
};
