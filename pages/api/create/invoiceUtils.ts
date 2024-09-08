import fs from "fs";
import path from "path";
import Imap from "imap";
import nodemailer from "nodemailer";
import {
  convertHTMLToPDF,
  addTextToPDF,
} from "../../../utils/createPdfFromHtml";
import { createDir } from "../../../utils/utils";
import { InvoiceRequestBody } from "./types";

// Utility to load base directory from environment
const BASE_DIR = process.env.INVOICE_BASE_DIR || "/default/path/to/invoices";

// Helper function to safely build file paths
const safeJoin = (...segments: string[]) =>
  path.join(...segments.map((seg) => path.normalize(seg)));

// Validate and sanitize file and directory names
const sanitizeFilename = (filename: string) =>
  filename.replace(/[^a-zA-Z0-9-_.]/g, "_");

export const generateAndSendInvoice = async (
  invoiceRequest: InvoiceRequestBody,
) => {
  const {
    email,
    invoiceNumber,
    html,
    css,
    sendMailToRecepient,
    invoiceType,
    providerName,
    client,
  } = invoiceRequest;

  if (!providerName) throw new Error("Provider name is missing.");

  // Sanitize inputs to prevent directory traversal
  const sanitizedProviderName = sanitizeFilename(providerName);
  const sanitizedClient = sanitizeFilename(client);
  const sanitizedInvoiceNumber = sanitizeFilename(invoiceNumber);

  const fileName = `${invoiceType}-${sanitizedClient}-${sanitizedInvoiceNumber}.pdf`;

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  // Build the directory and file paths securely
  const baseDir = safeJoin(BASE_DIR, sanitizedProviderName);
  const sentDir = safeJoin(
    baseDir,
    "Sent",
    invoiceType,
    currentYear.toString(),
    currentMonth,
  );
  const localFilePathAndName = safeJoin(sentDir, fileName);

  // Ensure directories exist
  createDir(sentDir);

  // Convert HTML to PDF and add any text as needed
  const pdfBuffer = await convertHTMLToPDF(html, css);
  if (!pdfBuffer) throw new Error("Failed to generate PDF.");

  const modifiedPdfBuffer = await addTextToPDF(pdfBuffer);
  if (!modifiedPdfBuffer) throw new Error("Failed to modify PDF.");

  // Write the PDF file to disk
  try {
    await fs.promises.writeFile(localFilePathAndName, modifiedPdfBuffer);
  } catch (error) {
    console.error("Error writing PDF to disk:", error);
    throw new Error("Failed to save invoice PDF.");
  }

  if (sendMailToRecepient) {
    // Nodemailer transport configuration
    const transporter = nodemailer.createTransport({
      host: process.env.IMAP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.OFFICE_EMAIL, // Make sure this is not public (no NEXT_PUBLIC prefix)
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.OFFICE_EMAIL,
      to: email,
      subject: "Your Invoice",
      text: "Please find attached your invoice.",
      attachments: [
        {
          filename: fileName,
          path: localFilePathAndName,
          contentType: "application/pdf",
        },
      ],
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: %s", info.messageId);

      // IMAP configuration and saving the email to Sent folder
      await saveEmailToSent(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send invoice email.");
    }
  }

  return { path: sentDir, fileName };
};

// Function to save the sent email to the IMAP Sent folder
async function saveEmailToSent(mailOptions: any) {
  return new Promise<void>((resolve, reject) => {
    const imapConfig = {
      user: process.env.OFFICE_EMAIL as string,
      password: process.env.EMAIL_PASS,
      host: process.env.IMAP_HOST,
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    };

    const imap = new Imap(imapConfig);

    imap.once("ready", () => {
      imap.openBox("INBOX.Sent", false, (err, box) => {
        if (err) {
          console.error("Error opening inbox:", err);
          return reject(err);
        }

        const message = buildEmailMessage(mailOptions);
        imap.append(
          message,
          { mailbox: "INBOX.Sent", flags: ["\\Seen"] },
          (err) => {
            if (err) {
              console.error("Error saving to Sent folder:", err);
              return reject(err);
            }
            console.log("Message saved to Sent folder");
            imap.end();
            resolve();
          },
        );
      });
    });

    imap.once("error", (err: any) => {
      console.error("IMAP error:", err);
      reject(err);
    });

    imap.once("end", () => {
      console.log("IMAP connection ended");
    });

    imap.connect();
  });
}

// Helper function to build raw email message
function buildEmailMessage(mailOptions: any) {
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
    fs.readFileSync(mailOptions.attachments[0].path).toString("base64"),
    ``,
    `--boundary--`,
    ``,
  ].join("\r\n");

  return message;
}
