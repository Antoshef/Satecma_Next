import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import {
  addTextToPDF,
  convertHTMLToPDF,
} from "../../../utils/createPdfFromHtml";
import { createDir } from "../../../utils/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "POST") {
    const { email, bcc, name, html, css } = req.body;
    const fileName = `offer-${name}.pdf`;
    try {
      const currentMonth = new Date().toLocaleString("default", {
        month: "long",
      });
      createDir("sent");
      createDir(`sent/offers`);
      createDir(`sent/offers/${currentMonth}`);
      const filePath = path.join("./", `sent/offers/${currentMonth}`, fileName);
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
        subject: "Your Offer",
        text: "Please find attached your offer.",
        attachments: [
          {
            filename: fileName,
            path: `./sent/offers/${fileName}`,
            contentType: "application/pdf",
          },
        ],
      });
      res.json({ message: "Offer generated and sent!" });
    } catch (error) {
      console.error("Error in offer generation or sending email:", error);
      res.status(500).json({ message: "Error generating or sending offer." });
    }
  }
}
