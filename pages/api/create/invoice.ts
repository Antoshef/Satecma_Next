import fs from "fs";
import Imap from "imap";
import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import {
  addTextToPDF,
  convertHTMLToPDF,
} from "../../../utils/createPdfFromHtml";
import { createDir } from "../../../utils/utils";
import { InvoiceType } from "@/create/invoice/types";

// Define the interface for the request body
export interface InvoiceRequestBody {
  email: string;
  invoiceNumber: string;
  html: string;
  css: string;
  sendMailToRecepient: boolean;
  invoiceType: InvoiceType;
  providerName: string;
  client: string;
}

// Extend the NextApiRequest interface to include the typed body
interface TypedNextApiRequest extends NextApiRequest {
  body: InvoiceRequestBody;
}

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  if (method === "POST") {
    const {
      email,
      invoiceNumber,
      html,
      css,
      sendMailToRecepient,
      invoiceType,
      providerName,
      client,
    } = req.body;
    const fileName = `${invoiceType}-${client}-${invoiceNumber}.pdf`;
    const companyFolder = providerName;
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    const currentYear = new Date().getFullYear();

    try {
      if (!providerName) throw new Error("Provider name is missing.");
      const baseDir = `/Users/antoshef/Satecma/invoices/${companyFolder}`;
      createDir(baseDir);
      createDir(`${baseDir}/Sent`);
      createDir(`${baseDir}/Sent/${invoiceType}`);
      createDir(`${baseDir}/Sent/${invoiceType}/${currentYear}`);
      createDir(
        `${baseDir}/Sent/${invoiceType}/${currentYear}/${currentMonth}`,
      );
      const localFilePath = `${baseDir}/Sent/${invoiceType}/${currentYear}/${currentMonth}/${fileName}`;

      const pdfBuffer = await convertHTMLToPDF(html, css);
      const modifiedPdfBuffer = pdfBuffer && (await addTextToPDF(pdfBuffer));

      if (modifiedPdfBuffer) {
        await fs.promises.writeFile(localFilePath, modifiedPdfBuffer);
      }

      if (sendMailToRecepient) {
        const transporter = nodemailer.createTransport({
          host: process.env.IMAP_HOST,
          port: 465,
          secure: true,
          auth: {
            user: process.env.NEXT_PUBLIC_OFFICE_EMAIL,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.NEXT_PUBLIC_OFFICE_EMAIL,
          to: email,
          subject: "Your Invoice",
          text: "Please find attached your invoice.",
          attachments: [
            {
              filename: fileName,
              path: localFilePath,
              contentType: "application/pdf",
            },
          ],
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error occurred: " + error.message);
            return;
          }

          console.log("Message sent: %s", info.messageId);

          const imapConfig = {
            user: process.env.NEXT_PUBLIC_OFFICE_EMAIL,
            password: process.env.EMAIL_PASS,
            host: process.env.IMAP_HOST,
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
          };

          const imap = new Imap(imapConfig);

          imap.once("ready", () => {
            imap.openBox("INBOX", false, (err, box) => {
              if (err) {
                console.error("Error opening inbox:", err);
                imap.end();
                return;
              }

              const message = [
                `From: ${mailOptions.from}`,
                `To: ${mailOptions.to}`,
                `Subject: ${mailOptions.subject}`,
                `MIME-Version: 1.0`,
                `Content-Type: multipart/mixed; boundary="boundary"`,
                ``,
                `--boundary`,
                `Content-Type: text/plain; charset=utf-8`,
                ``,
                mailOptions.text,
                ``,
                `--boundary`,
                `Content-Type: application/pdf; name="${mailOptions.attachments[0].filename}"`,
                `Content-Disposition: attachment; filename="${mailOptions.attachments[0].filename}"`,
                `Content-Transfer-Encoding: base64`,
                ``,
                fs
                  .readFileSync(mailOptions.attachments[0].path)
                  .toString("base64"),
                ``,
                `--boundary--`,
                ``,
              ].join("\r\n");

              // Append the raw message to the Sent folder
              imap.append(
                message,
                { mailbox: "INBOX.Sent", flags: ["\\Seen"] },
                (err) => {
                  if (err) {
                    console.error("Error saving to Sent folder:", err);
                  } else {
                    console.log("Message saved to Sent folder");
                  }
                  imap.end();
                },
              );
            });
          });

          imap.once("error", (err: any) => {
            console.error("IMAP error:", err);
          });

          imap.once("end", () => {
            console.log("IMAP connection ended");
          });

          imap.connect();
        });

        console.log("Email sent");
      }

      res.status(200).json({ message: "Invoice generated and sent!" });
    } catch (error) {
      console.error("Error in invoice generation or sending email:", error);
      res.status(500).json({ message: "Error generating or sending invoice." });
    }
  }
}
