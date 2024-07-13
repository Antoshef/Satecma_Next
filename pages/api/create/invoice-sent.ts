import { InvoiceData } from "@/create/invoice/types";
import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../../utils/db";
import { Company } from "@/create/invoice/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const {
    client,
    eik,
    vat_number,
    date,
    invoice_id,
    amount,
    vat,
    total,
    company,
    type,
  } = req.body as InvoiceData & { company: Company };
  const table_name =
    company === Company.ekoHome ? "eko_invoices_sent" : "satecma_invoices_sent";

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
      if (
        !client ||
        !eik ||
        !vat_number ||
        !date ||
        !invoice_id ||
        !amount ||
        !vat ||
        !total ||
        !type
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      } else if (invoice_id.length !== 10) {
        return res.status(400).json({
          message: "Invoice number must be 10 characters long",
        });
      }
      const results = await queryAsync(
        `
        INSERT INTO eko_invoices_sent (client, eik, vat_number, date, invoice_id, amount, vat, total, type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [client, eik, vat_number, date, invoice_id, amount, vat, total, type],
      );
      if (!results) {
        return res.status(500).json({ message: "Invoice not sent" });
      }
      return res.status(200).json({ message: "Invoice sent" });
    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
