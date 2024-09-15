import { NextApiRequest, NextApiResponse } from 'next';
import { generateAndSendDocument } from './documentUtils';
import { DocumentRequestBody } from './types';
import { queryAsync } from '../../../utils/db';
import { InvoiceData } from '@/create/invoice/types';

interface TypedNextApiRequest extends NextApiRequest {
  body: DocumentRequestBody;
}

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { company } = req.query;
  const table_name = 'eko_invoices_sent';

  if (!table_name) {
    return res.status(400).json({ message: 'Invalid company name' });
  }

  if (method === 'GET') {
    try {
      console.log('GET');
      const results = await queryAsync<InvoiceData[]>(
        `SELECT * FROM ${table_name}`
      );
      if (!results || results.length === 0) {
        return res.status(404).json({ message: 'Invoices not found' });
      }
      return res.status(200).json(results);
    } catch (error) {
      console.error('GET error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (method === 'POST') {
    try {
      const documentRequest = req.body;

      // Validate required fields
      const requiredFields: (keyof DocumentRequestBody)[] = [
        'email',
        'name',
        'html',
        'css',
        'sendMailToRecepient',
        'documentType',
        'providerName',
        'client'
      ];
      const missingFields: (keyof DocumentRequestBody)[] = [];

      requiredFields.forEach((field) => {
        if (!documentRequest[field]) missingFields.push(field);
      });

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(', ')}`
        });
      }

      // Generate and send the document
      const { path: filePath } = await generateAndSendDocument(documentRequest);
      if (!filePath) {
        return res.status(500).json({ message: 'Error generating document' });
      }

      // Successfully saved the document
      return res.status(200).json({
        message: 'Document generated and sent',
        file_path: filePath
      });
    } catch (error) {
      console.error('POST error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
