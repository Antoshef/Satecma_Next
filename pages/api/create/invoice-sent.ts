import { InvoiceData } from "@/create/invoice/types";
import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    try {
      const results = await queryAsync<InvoiceData[]>(
        `SELECT * FROM eko_invoices_sent`
      );
      if (!results) {
        return res.status(404).json({ message: "Invoices not found" });
      }
      return res.status(200).json({ data: results, status: 200 });
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: (error as any).message,
      });
    }
  }

  if (method === "POST") {
    try {
      const { client, eik, vat_number, date, invoice_id, amount, vat, total } =
        req.body as InvoiceData;
      if (
        !client ||
        !eik ||
        !vat_number ||
        !date ||
        !invoice_id ||
        !amount ||
        !vat ||
        !total
      ) {
        return res
          .status(400)
          .json({ message: "Missing required fields", status: 400 });
      } else if (invoice_id.length !== 10) {
        return res.status(400).json({
          message: "Invoice number must be 10 characters long",
          status: 400,
        });
      }
      const results = await queryAsync(
        `
        INSERT INTO eko_invoices_sent (client, eik, vat_number, date, invoice_id, amount, vat, total)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [client, eik, vat_number, date, invoice_id, amount, vat, total]
      );
      if (!results) {
        return res
          .status(500)
          .json({ message: "Invoice not sent", status: 500 });
      }
      return res.status(200).json({ message: "Invoice sent", status: 200 });
    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: (error as any).message,
        status: 500,
      });
    }
  }
}
