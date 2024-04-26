import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { addTextToPDF, convertHTMLToPDF } from "../../utils/createPdfFromHtml";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "POST") {
    const { email, bcc, invoiceNumber, html, css } = req.body;
    const fileName = `invoice-${invoiceNumber}.pdf`;

    try {
      const filePath = path.join("./", "sent", fileName);
      const htmlWithCSS = `<style>${css}</style>` + html;
      const pdfBuffer = await convertHTMLToPDF(htmlWithCSS);
      const modifiedPdfBuffer = await addTextToPDF(pdfBuffer);

      await fs.promises.writeFile(filePath, modifiedPdfBuffer);

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
            path: `./sent/${fileName}`,
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
