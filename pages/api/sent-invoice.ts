import { InvoiceData } from "@/components/invoiceBox/types";
import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    try {
      const { client, eik, vat_number, date, invoice_id, amount, vat, total } =
        req.body as InvoiceData;
      const results = await queryAsync(
        `
        INSERT INTO eko_invoices_sent (client, eik, vat_number, date, invoice_id, amount, vat, total)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [client, eik, vat_number, date, invoice_id, amount, vat, total]
      );
      if (!results) {
        return res.status(500).json({ message: "Invoice not sent" });
      }
      return res.status(200).json({ message: "Invoice sent" });
    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: (error as any).message,
      });
    }
  }
}
