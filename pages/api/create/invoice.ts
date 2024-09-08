import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../../utils/db";
import { generateAndSendInvoice } from "./invoiceUtils";
import { InvoiceRequestBody } from "./types";
import { InvoiceData } from "@/create/invoice/types";

export interface IInvoice extends InvoiceData {
  file_path: string;
}

interface TypedNextApiRequest extends NextApiRequest {
  body: {
    invoiceRequest: InvoiceRequestBody;
    invoiceData: InvoiceData;
  };
}

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { company } = req.query;
  const table_name = "eko_invoices_sent";

  if (!table_name) {
    return res.status(400).json({ message: "Invalid company name" });
  }

  if (method === "GET") {
    try {
      const results = await queryAsync<InvoiceData[]>(
        `SELECT * FROM ${table_name}`,
      );
      if (!results || results.length === 0) {
        return res.status(404).json({ message: "Invoices not found" });
      }
      return res.status(200).json({ data: results });
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (method === "POST") {
    try {
      const { invoiceRequest, invoiceData } = req.body;

      // Validate required fields
      const missingFields: typeof requiredFields = [];
      const requiredFields: (keyof InvoiceData)[] = [
        "client",
        "eik",
        "vat_number",
        "date",
        "invoice_id",
        "amount",
        "vat",
        "total",
        "type",
      ];
      requiredFields.forEach((field) => {
        if (!invoiceData[field]) missingFields.push(field);
      });

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      if (!invoiceRequest) {
        return res.status(400).json({ message: "Missing invoice request" });
      }

      if (invoiceData.invoice_id.length !== 10) {
        return res
          .status(400)
          .json({ message: "Invoice number must be 10 characters long" });
      }

      // Generate and send the invoice
      const { path: filePath } = await generateAndSendInvoice(invoiceRequest);
      if (!filePath) {
        return res.status(500).json({ message: "Error generating invoice" });
      }

      // Save the relative path to the database
      const relativeFilePath = filePath.replace(
        process.env.INVOICE_BASE_DIR || "",
        "",
      );

      // Insert into database
      const result = await queryAsync(
        `INSERT INTO ${table_name} (client, eik, vat_number, date, invoice_id, amount, vat, total, type, file_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          invoiceData.client,
          invoiceData.eik,
          invoiceData.vat_number,
          invoiceData.date,
          invoiceData.invoice_id,
          invoiceData.amount,
          invoiceData.vat,
          invoiceData.total,
          invoiceData.type,
          relativeFilePath,
        ],
      );

      if (!result) {
        return res
          .status(500)
          .json({ message: "Invoice not saved to the database" });
      }

      // Successfully saved the invoice
      return res.status(200).json({
        message: "Invoice sent and saved",
        file_path: relativeFilePath,
      });
    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
