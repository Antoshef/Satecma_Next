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
    const year = new Date().getFullYear();
    const dirPath = path.join(
      process.cwd(),
      'databases',
      `${invoiceData.provider?.name}_${invoiceData.provider?.eik}`,
      'sent',
      invoiceData.invoiceType,
      year.toString()
    );
    const filePath = path.join(
      dirPath,
      `${invoiceData.invoiceType}-${year}.json`
    );

    // Ensure the directory exists
    try {
      fs.mkdirSync(dirPath, { recursive: true });
    } catch {
      return res.status(500).json({ error: 'Failed to create directories' });
    }

    let invoices = [];

    try {
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        if (fileData) {
          invoices = JSON.parse(fileData);
        }
      }
    } catch {
      console.warn(
        'Failed to read or parse invoices file, initializing with empty array'
      );
    }

    invoices.push(invoiceData);

    try {
      fs.writeFileSync(filePath, JSON.stringify(invoices, null, 2));
      return res.status(200).json({ message: 'Invoice saved successfully' });
    } catch {
      return res.status(500).json({ error: 'Failed to save invoice' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
