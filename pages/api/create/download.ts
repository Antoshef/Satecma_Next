import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { company, year, month, invoiceName } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Validate required parameters
  if (!company || !year || !month || !invoiceName) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  // Construct the directory path dynamically based on the query parameters
  const directoryPath = path.join(
    '/path/to/invoices', // Adjust this to your actual root invoices directory
    company as string,
    year as string,
    month as string
  );
  const filePath = path.join(directoryPath, `${invoiceName}.pdf`);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found' });
  }

  // Set the headers and send the file for download
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${invoiceName}.pdf"`
  );
  res.setHeader('Content-Type', 'application/pdf');

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
}
