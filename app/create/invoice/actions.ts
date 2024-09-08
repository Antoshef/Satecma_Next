import { fetchData } from "@/utils/fetchData";
import { InvoiceData, InvoiceReceiver, Item } from "./types";
import { InvoiceRequestBody } from "../../../pages/api/create/types";

export const updateProducts = async (items: Item[]) => {
  return await fetchData("/api/products/update", {
    method: "PUT",
    body: JSON.stringify({ items }),
  });
};

export const getClientData = async (receiver: InvoiceReceiver) => {
  return await fetchData("/api/clients/get", {
    method: "POST",
    body: JSON.stringify({
      name: receiver.company,
      city: receiver.city,
      address: receiver.address,
      eik: receiver.EIK,
      vat: receiver.VAT,
      director: receiver.director,
      email: receiver.email,
      phone: receiver.phone,
    }),
  });
};

export const createInvoice = async ({
  invoiceRequest,
  invoiceData,
}: {
  invoiceRequest: InvoiceRequestBody;
  invoiceData: InvoiceData;
}) => {
  return await fetchData("/api/create/invoice", {
    method: "POST",
    body: JSON.stringify({ invoiceRequest, invoiceData }),
  });
};
