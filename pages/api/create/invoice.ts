import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import {
  addTextToPDF,
  convertHTMLToPDF,
} from "../../../utils/createPdfFromHtml";
import { createDir } from "../../../utils/utils";
import { InvoiceType } from "@/create/invoice/types";
import { Company } from "@/create/invoice/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "POST") {
    const {
      email,
      bcc,
      invoiceNumber,
      html,
      css,
      sendMailToRecepient,
      invoiceType,
      providerName,
    } = req.body;
    const fileType = InvoiceType.invoice ? "фактура" : "проформа-фактура";
    const fileName = `${fileType}-${invoiceNumber}.pdf`;
    const invoiceFolder =
      invoiceType === InvoiceType.invoice ? "фактури" : "проформа-фактури";
    const companyFolder =
      providerName === Company.ekoHome
        ? "Еко Хоум"
        : Company.satecma
        ? "Сатекма"
        : "";
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    const currentYear = new Date().getFullYear();

    try {
      if (!providerName) throw new Error("Provider name is missing.");
      createDir(`/Users/antoshef/Satecma/фактури/${companyFolder}`);
      createDir(`/Users/antoshef/Satecma/фактури/${companyFolder}/Издадени`);
      createDir(
        `/Users/antoshef/Satecma/фактури/${companyFolder}/Издадени/${invoiceFolder}`
      );
      createDir(
        `/Users/antoshef/Satecma/фактури/${companyFolder}/Издадени/${invoiceFolder}/${currentYear}`
      );
      createDir(
        `/Users/antoshef/Satecma/фактури/${companyFolder}/Издадени/${invoiceFolder}/${currentYear}/${currentMonth}`
      );
      const localFilePath = `/Users/antoshef/Satecma/фактури/${companyFolder}/Издадени/${invoiceFolder}/${currentYear}/${currentMonth}/${fileName}`;
      createDir("sent");
      createDir(`sent/${invoiceFolder}`);
      createDir(`sent/${invoiceFolder}/${currentMonth}`);
      const filePath = path.join(
        "./",
        `sent/${invoiceFolder}/${currentMonth}`,
        fileName
      );
      const pdfBuffer = await convertHTMLToPDF(html, css);
      const modifiedPdfBuffer = pdfBuffer && (await addTextToPDF(pdfBuffer));

      modifiedPdfBuffer &&
        (await fs.promises.writeFile(filePath, modifiedPdfBuffer));
      modifiedPdfBuffer &&
        (await fs.promises.writeFile(localFilePath, modifiedPdfBuffer));

      let transporter = nodemailer.createTransport({
        host: process.env.IMAP_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.SALES_EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });
      if (sendMailToRecepient) {
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
      } else if (bcc.length) {
        await transporter.sendMail({
          from: process.env.SALES_EMAIL,
          to: bcc,
          subject: "Invoice",
          text: "Please find attached the invoice.",
          attachments: [
            {
              filename: fileName,
              path: filePath,
              contentType: "application/pdf",
            },
          ],
        });

        console.log("Email sent to bcc");
      }

      res.status(200).json({ message: "Invoice generated and sent!" });
    } catch (error) {
      console.error("Error in invoice generation or sending email:", error);
      res.status(500).json({ message: "Error generating or sending invoice." });
    }
  }
}
