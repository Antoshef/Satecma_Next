import { InvoiceData } from "@/create/invoice/types";
import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../../utils/db";
import { Company } from "@/create/invoice/constants";
import { generateAndSendInvoice, InvoiceRequestBody } from "./invoiceUtils";

export interface IInvoice extends InvoiceData {
  file_path: string;
}

interface TypedNextApiRequest extends NextApiRequest {
  invoiceRequest: InvoiceRequestBody;
  invoiceData: InvoiceData;
}

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  const { company } = req.query;

  const getTableName = (name: string) => {
    switch (name) {
      case Company.ekoHome:
        return "eko_invoices_sent";
      case Company.satecma:
        return "satecma_invoices_sent";
      default:
        return null;
    }
  };
  const table_name = getTableName(company as string);

  if (method === "GET") {
    try {
      const results = await queryAsync<InvoiceData[]>(
        `SELECT * FROM eko_invoices_sent`,
      );
      if (!results) {
        return res.status(404).json({ message: "Invoices not found" });
      }
      return res.status(200).json({ data: results });
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  if (method === "POST") {
    try {
      const { invoiceRequest, invoiceData } = req.body;

      // Destructure fields from invoiceData
      const {
        client,
        eik,
        vat_number,
        date,
        invoice_id,
        amount,
        vat,
        total,
        type,
      } = invoiceData;

      // Check for missing required fields and invalid invoice ID length
      const missingFields = [];
      if (!client) missingFields.push("client");
      if (!eik) missingFields.push("eik");
      if (!vat_number) missingFields.push("vat_number");
      if (!date) missingFields.push("date");
      if (!invoice_id) missingFields.push("invoice_id");
      if (!amount) missingFields.push("amount");
      if (!vat) missingFields.push("vat");
      if (!total) missingFields.push("total");
      if (!type) missingFields.push("type");

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      if (!invoiceRequest) {
        return res.status(400).json({ message: "Missing invoice request" });
      }

      if (invoice_id.length !== 10) {
        return res.status(400).json({
          message: "Invoice number must be 10 characters long",
        });
      }

      // Generate and send invoice
      const file_path = await generateAndSendInvoice(invoiceRequest);
      if (!file_path) {
        return res.status(500).json({ message: "Error generating invoice" });
      }

      // Insert into database only after successful invoice generation
      const results = await queryAsync(
        `
        INSERT INTO eko_invoices_sent (client, eik, vat_number, date, invoice_id, amount, vat, total, type, file_path)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          client,
          eik,
          vat_number,
          date,
          invoice_id,
          amount,
          vat,
          total,
          type,
          file_path,
        ],
      );

      if (!results) {
        return res
          .status(500)
          .json({ message: "Invoice not saved to the database" });
      }

      // Successfully sent and stored
      return res
        .status(200)
        .json({ message: "Invoice sent and saved", file_path });
    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
