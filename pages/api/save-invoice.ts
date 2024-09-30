import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { InvoiceMetaData } from '@/create/invoice/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const invoiceData = req.body as InvoiceMetaData;

    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    const dirPath = path.join(process.cwd(), 'public', 'sent', year, month);
    const filePath = path.join(dirPath, invoiceData.invoiceNumber + '.json');

    // Ensure the directory exists
    try {
      fs.mkdirSync(dirPath, { recursive: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create directories' });
    }

    let invoices = [];

    try {
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        invoices = JSON.parse(fileData);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to read invoices file' });
    }

    invoices.push(invoiceData);

    try {
      fs.writeFileSync(filePath, JSON.stringify(invoices, null, 2));
      return res.status(200).json({ message: 'Invoice saved successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save invoice' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
