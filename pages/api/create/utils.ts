import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Imap from 'imap';
import nodemailer from 'nodemailer';
import { DocumentRequest } from './types';
import {
  convertHTMLToPDF,
  addTextToPDF
} from '../../../utils/createPdfFromHtml';

// Promisified versions of fs functions
const writeFileAsync = promisify(fs.writeFile);

// Utility to load base directory from environment
const BASE_DIR = process.env.DOCUMENT_BASE_DIR || '/databases';

// Helper function to safely build file paths
const safeJoin = (...segments: string[]) =>
  path.join(...segments.map((seg) => path.normalize(seg)));

// Sanitize file and directory names to avoid issues
const sanitizeFilename = (filename: string) =>
  filename.replace(/[^a-zA-Z0-9-_.]/g, '_');

// Create directory if it doesn't exist
const ensureDirectoryExists = async (directoryPath: string) => {
  if (!fs.existsSync(directoryPath)) {
    await fs.promises.mkdir(directoryPath, { recursive: true });
  }
};

// Write the file to disk
const saveFileToDisk = async (filePath: string, fileContent: Buffer) => {
  try {
    await writeFileAsync(filePath, new Uint8Array(fileContent));
    console.log(`File saved successfully at ${filePath}`);
  } catch (error) {
    console.error('Error writing file to disk:', error);
    throw new Error('Failed to save the file');
  }
};

// Main function to generate and send the document
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
    provider,
    clientName
  } = documentRequest;
  const { name: providerName, eik } = provider;

  if (!providerName) throw new Error('Provider name is missing.');

  // Sanitize inputs
  const sanitizedProviderName = sanitizeFilename(`${providerName}_${eik}`);
  const sanitizedClientName = sanitizeFilename(clientName);
  const sanitizedDocumentNumber = sanitizeFilename(documentNumber);

  const fileName = `${documentType}-${sanitizedClientName}-${sanitizedDocumentNumber}.pdf`;
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  // Build file path securely
  const sentDir = safeJoin(
    BASE_DIR,
    sanitizedProviderName,
    'sent',
    documentType,
    currentYear.toString(),
    currentMonth
  );
  const filePath = safeJoin(sentDir, fileName);

  // Ensure directory exists
  await ensureDirectoryExists(sentDir);

  // Generate and save PDF
  const pdfBuffer = await convertHTMLToPDF(html, css);
  if (!pdfBuffer) throw new Error('Failed to generate PDF.');

  const modifiedPdfBuffer = await addTextToPDF(pdfBuffer);
  if (!modifiedPdfBuffer) throw new Error('Failed to modify PDF.');

  // Save PDF to disk
  await saveFileToDisk(filePath, Buffer.from(modifiedPdfBuffer));

  // Optionally send email with the generated document
  if (sendMailToRecepient) {
    await sendDocumentEmail(email, documentType, filePath, fileName);
  }

  return { path: sentDir, fileName };
};

// Function to send email with the generated document
const sendDocumentEmail = async (
  email: string,
  documentType: string,
  filePath: string,
  fileName: string
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.IMAP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.PROFILE_EMAIL,
      pass: process.env.PROFILE_EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.PROFILE_EMAIL,
    to: email,
    subject: `Your ${documentType}`,
    text: `Please find attached your ${documentType}.`,
    attachments: [
      { filename: fileName, path: filePath, contentType: 'application/pdf' }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);

    // Save email to Sent folder using IMAP
    await saveEmailToSent(mailOptions);
  } catch {
    throw new Error(`Failed to send ${documentType} email.`);
  }
};

// Function to save the sent email to the IMAP Sent folder
const saveEmailToSent = (mailOptions: nodemailer.SendMailOptions) => {
  return new Promise<void>((resolve, reject) => {
    const imap = new Imap({
      user: process.env.PROFILE_EMAIL || '',
      password: process.env.PROFILE_EMAIL_PASS || '',
      host: process.env.IMAP_HOST,
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    });

    imap.once('ready', () => {
      imap.openBox('INBOX.Sent', false, (err) => {
        if (err) return reject(err);

        const message = buildEmailMessage(mailOptions);
        imap.append(
          message,
          { mailbox: 'INBOX.Sent', flags: ['\\Seen'] },
          (err) => {
            if (err) return reject(err);
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
};

// Helper function to build the raw email message
const buildEmailMessage = (mailOptions: nodemailer.SendMailOptions) => {
  const attachment = mailOptions.attachments
    ? mailOptions.attachments[0]
    : null;
  const attachmentContent = attachment
    ? fs.readFileSync(attachment.path as string).toString('base64')
    : '';

  const message = [
    `From: ${mailOptions.from}`,
    `To: ${mailOptions.to}`,
    `Subject: ${mailOptions.subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/mixed; boundary="boundary"`,
    ``,
    `--boundary`,
    `Content-Type: text/plain; charset=utf-8`,
    mailOptions.text,
    `--boundary`,
    `Content-Type: application/pdf; name="${attachment?.filename}"`,
    `Content-Disposition: attachment; filename="${attachment?.filename}"`,
    `Content-Transfer-Encoding: base64`,
    attachmentContent,
    `--boundary--`,
    ``
  ].join('\r\n');

  return message;
};
