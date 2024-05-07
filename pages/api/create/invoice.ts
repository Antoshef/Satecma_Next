import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { addTextToPDF, convertHTMLToPDF } from "../../../utils/createPdfFromHtml";
import { createDir } from "../../../utils/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "POST") {
    const { email, bcc, invoiceNumber, html, css } = req.body;
    const fileName = `invoice-${invoiceNumber}.pdf`;

    try {
      const currentMonth = new Date().toLocaleString("default", {
        month: "long",
      });
      createDir("sent");
      createDir("sent/invoices");
      createDir(`sent/invoices/${currentMonth}`);
      const filePath = path.join(
        "./",
        `sent/invoices/${currentMonth}`,
        fileName
      );
      const pdfBuffer = await convertHTMLToPDF(html, css);
      const modifiedPdfBuffer = pdfBuffer && (await addTextToPDF(pdfBuffer));

      modifiedPdfBuffer &&
        (await fs.promises.writeFile(filePath, modifiedPdfBuffer));

      let transporter = nodemailer.createTransport({
        host: process.env.IMAP_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.SALES_EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SALES_EMAIL,
        to: email,
        bcc: bcc,
        subject: "Your Invoice",
        text: "Please find attached your invoice.",
        attachments: [
          {
            filename: fileName,
            path: filePath,
            contentType: "application/pdf",
          },
        ],
      });

      console.log("Email sent");
      res.json({ message: "Invoice generated and sent!" });
    } catch (error) {
      console.error("Error in invoice generation or sending email:", error);
      res.status(500).json({ message: "Error generating or sending invoice." });
    }
  }
}
