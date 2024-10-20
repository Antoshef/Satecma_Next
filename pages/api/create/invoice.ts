import { NextApiRequest, NextApiResponse } from 'next';
import { generateAndSendDocument } from './documentUtils';
import { DocumentRequestBody, InvoiceRequestBody } from './types';
import { queryAsync } from '../../../utils/db';
import { InvoiceData } from '@/create/invoice/types';

interface TypedNextApiRequest extends NextApiRequest {
  body: DocumentRequestBody;
}

const table_name = 'invoices_sent';

// Helper function to validate missing fields
const validateRequiredFields = (
  requiredFields: (keyof InvoiceRequestBody)[],
  data: InvoiceRequestBody
) => {
  const missingFields: (keyof InvoiceRequestBody)[] = [];
  requiredFields.forEach((field) => {
    if (!data[field]) missingFields.push(field);
  });
  return missingFields;
};

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { user_id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const results = await queryAsync<InvoiceData[]>(
          `SELECT * FROM ?? WHERE user_id = ?`,
          [table_name, user_id]
        );
        if (!results || results.length === 0) {
          return res.status(404).json({ message: 'Invoices not found' });
        }
        return res.status(200).json(results);
      } catch (error) {
        console.error('GET error:', error);
        return res.status(500).json({
          message: 'Internal server error',
          error: (error as Error).message
        });
      }

    case 'POST':
      try {
        const { invoiceRequest, invoiceData } = req.body;

        // Validate required fields
        const requiredFields: (keyof InvoiceRequestBody)[] = [
          'email',
          'invoiceNumber',
          'html',
          'css',
          'sendMailToRecepient',
          'documentType',
          'provider',
          'clientName'
        ];
        const missingFields = validateRequiredFields(
          requiredFields,
          invoiceRequest
        );

        if (missingFields.length > 0) {
          return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(', ')}`
          });
        }

        // Generate and send the document
        const { path: filePath, fileName } =
          await generateAndSendDocument(invoiceRequest);
        if (!filePath || !fileName) {
          return res.status(500).json({ message: 'Error generating document' });
        }

        const {
          amount,
          clientName,
          date,
          eik,
          invoice_id,
          total,
          type,
          vat,
          vat_number
        } = invoiceData;

        const insertQuery = `
          INSERT INTO ?? 
          (invoice_id, client_name, eik, vat_number, date, amount, vat, total, type, file_path, user_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
          table_name,
          invoice_id,
          clientName,
          eik,
          vat_number,
          date,
          amount,
          vat,
          total,
          type,
          `${filePath}/${fileName}`,
          user_id
        ];

        await queryAsync(insertQuery, values);

        return res.status(200).json({
          message: 'Document generated and sent',
          file_path: `${filePath}/${fileName}`
        });
      } catch (error) {
        console.error('POST error:', error);
        return res.status(500).json({
          message: 'Internal server error',
          error: (error as Error).message
        });
      }

    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
