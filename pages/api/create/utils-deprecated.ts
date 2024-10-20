import fs from 'fs';
import Imap from 'imap';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import nodemailer from 'nodemailer';
import path from 'path';
import { DocumentRequest } from './types';
import { createDir } from '../../../utils/utils';
import {
  addTextToPDF,
  convertHTMLToPDF
} from '../../../utils/createPdfFromHtml';

// Utility to load base directory from environment
const BASE_DIR = process.env.DOCUMENT_BASE_DIR || '/databases';

// Helper function to safely build file paths
const safeJoin = (...segments: string[]) =>
  path.join(...segments.map((seg) => path.normalize(seg)));

// Validate and sanitize file and directory names
const sanitizeFilename = (filename: string) =>
  filename.replace(/[^a-zA-Z0-9-_.]/g, '_');

export const generateAndSendDocument = async (
  documentRequest: DocumentRequest
) => {
  const {
    email,
    html,
    documentNumber,
    css,
    sendMailToRecepient,
    documentType,
    provider: { name: providerName, eik },
    clientName
  } = documentRequest;

  if (!providerName) throw new Error('Provider name is missing.');

  // Sanitize inputs to prevent directory traversal
  const sanitizedProviderName = sanitizeFilename(`${providerName}_${eik}`);
  const sanitizedClientName = sanitizeFilename(clientName);
  const sanitizedInvoiceNumber = sanitizeFilename(documentNumber);

  const fileName = `${documentType}-${sanitizedClientName}-${sanitizedInvoiceNumber}.pdf`;

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  // Build the directory and file paths securely
  const sentDir = safeJoin(
    BASE_DIR,
    sanitizedProviderName,
    'sent',
    documentType,
    currentYear.toString(),
    currentMonth
  );
  const localFilePathAndName = safeJoin(sentDir, fileName);

  // Ensure directories exist
  createDir(sentDir);

  // Convert HTML to PDF and add any text as needed
  const pdfBuffer = await convertHTMLToPDF(html, css);
  if (!pdfBuffer) throw new Error('Failed to generate PDF.');

  const modifiedPdfBuffer = await addTextToPDF(pdfBuffer);
  if (!modifiedPdfBuffer) throw new Error('Failed to modify PDF.');

  // Write the PDF file to disk
  try {
    await fs.promises.writeFile(localFilePathAndName, modifiedPdfBuffer);
  } catch (error) {
    console.error('Error writing PDF to disk:', error);
    throw new Error('Failed to save document PDF.');
  }

  if (sendMailToRecepient) {
    // Nodemailer transport configuration
    const transporter = nodemailer.createTransport({
      host: process.env.IMAP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.PROFILE_EMAIL, // Make sure this is not public (no NEXT_PUBLIC prefix)
        pass: process.env.PROFILE_EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.PROFILE_EMAIL,
      to: email,
      subject: `Your ${documentType}`,
      text: `Please find attached your ${documentType}.`,
      attachments: [
        {
          filename: fileName,
          path: localFilePathAndName,
          contentType: 'application/pdf'
        }
      ]
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: %s', info.messageId);

      // IMAP configuration and saving the email to Sent folder
      await saveEmailToSent(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send ${documentType} email.`);
    }
  }

  return { path: sentDir, fileName };
};

// Function to save the sent email to the IMAP Sent folder
export async function saveEmailToSent(mailOptions: MailOptions) {
  return new Promise<void>((resolve, reject) => {
    const imapConfig = {
      user: process.env.PROFILE_EMAIL as string,
      password: process.env.PROFILE_EMAIL_PASS as string,
      host: process.env.IMAP_HOST,
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    };

    const imap = new Imap(imapConfig);

    imap.once('ready', () => {
      imap.openBox('INBOX.Sent', false, (err) => {
        if (err) {
          console.error('Error opening inbox:', err);
          return reject(err);
        }

        const message = buildEmailMessage(mailOptions);
        imap.append(
          message,
          { mailbox: 'INBOX.Sent', flags: ['\\Seen'] },
          (err) => {
            if (err) {
              console.error('Error saving to Sent folder:', err);
              return reject(err);
            }
            console.log('Message saved to Sent folder');
            imap.end();
            resolve();
          }
        );
      });
    });

    imap.once('error', (err: Error) => {
      console.error('IMAP error:', err);
      reject(err);
    });

    imap.once('end', () => {
      console.log('IMAP connection ended');
    });

    imap.connect();
  });
}

// Helper function to build raw email message

function buildEmailMessage(mailOptions: MailOptions) {
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
    `Content-Type: application/pdf; name="${mailOptions.attachments ? mailOptions.attachments[0].filename : ''}"`,
    `Content-Disposition: attachment; filename="${mailOptions.attachments ? mailOptions.attachments[0].filename : ''}"`,
    `Content-Transfer-Encoding: base64`,
    ``,
    mailOptions.attachments &&
      fs
        .readFileSync(mailOptions.attachments[0].path as string)
        .toString('base64'),
    ``,
    `--boundary--`,
    ``
  ].join('\r\n');

  return message;
}
