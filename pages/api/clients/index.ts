import { Client } from '@/clients/utils/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { authMiddleware } from '@/utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await new Promise<void>((resolve) => authMiddleware(req, res, resolve));

  // Extract the user's Auth0 ID from the JWT token (req.user.sub)
  const user_id = (req as any).user.sub;

  const { method } = req;

  if (method === 'GET') {
    try {
      const results = await queryAsync<Client[]>(
        `SELECT * FROM clients WHERE user_id = ?`, 
        [user_id]
      );
      if (!results) {
        return res.status(404).json({ message: 'Clients not found' });
      }
      return res.status(200).json(results);
    } catch (error) {
      console.error('GET error:', error);
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  }

  if (method === 'POST') {
    try {
      const { name, city, address, eik, vat, director, email, phone } = req.body as Client;
      if (!eik) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Check if the client already exists
      const existingClients = await queryAsync<Client[]>(
        `SELECT * FROM clients WHERE eik = ? AND user_id = ?`, 
        [eik, user_id]
      );
      
      if (existingClients.length > 0) {
        return res.status(200).json({ message: 'Client already exists' });
      } else {
        await queryAsync(
          `
          INSERT INTO clients (user_id, name, city, address, eik, vat, director, email, phone)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
          [user_id, name, city, address, eik, vat, director, email, phone]
        );
        return res.status(200).json({ message: 'Client created' });
      }
    } catch (error) {
      console.error('POST error:', error);
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  }

  if (method === 'PUT') {
    try {
      const { name, city, address, eik, vat, director, email, phone } = req.body as Client;
      if (!eik) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      await queryAsync(
        `
        UPDATE clients
        SET name = ?, city = ?, address = ?, vat = ?, director = ?, email = ?, phone = ?
        WHERE eik = ? AND user_id = ?
        `,
        [name, city, address, vat, director, email, phone, eik, user_id]
      );
      return res.status(200).json({ message: 'Client updated' });
    } catch (error) {
      console.error('PUT error:', error);
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  }
}
