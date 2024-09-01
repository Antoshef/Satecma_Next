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
    type,
  } = req.body as InvoiceData;
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
        `SELECT * FROM ${table_name}`,
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
