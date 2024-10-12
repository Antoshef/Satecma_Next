import { Client } from '@/clients/utils/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { authMiddleware } from '@/utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Apply the authentication middleware
  await new Promise<void>((resolve) => authMiddleware(req, res, resolve));

  // Extract the user's ID from the JWT token (req.user.userId)
  const user_id = (req as any).user.userId;

  const { method } = req;

  if (method === 'GET') {
    try {
      const results = await queryAsync<Client[]>(
        `SELECT * FROM clients WHERE user_id = ?`,
        [user_id]
      );
      if (!results.length) {
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
      const { name, city, address, eik, vat, director, email, phone } =
        req.body as Client;
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
        const result = await queryAsync(
          `
          INSERT INTO clients (user_id, name, city, address, eik, vat, director, email, phone)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
          [user_id, name, city, address, eik, vat, director, email, phone]
        );

        // Retrieve the new client with the generated UUID
        const [newClient] = await queryAsync<Client[]>(
          `SELECT id, client_uuid, name, city, address, eik, vat, director, email, phone
           FROM clients WHERE id = ?`,
          [result.id]
        );

        return res
          .status(201)
          .json({ message: 'Client created', client: newClient });
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
      const { name, city, address, eik, vat, director, email, phone } =
        req.body as Client;
      if (!eik) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const updateResult = await queryAsync(
        `
        UPDATE clients
        SET name = ?, city = ?, address = ?, vat = ?, director = ?, email = ?, phone = ?
        WHERE eik = ? AND user_id = ?
        `,
        [name, city, address, vat, director, email, phone, eik, user_id]
      );

      if (updateResult.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: 'Client not found or not owned by user' });
      }

      return res.status(200).json({ message: 'Client updated' });
    } catch (error) {
      console.error('PUT error:', error);
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  }

  // If the method is not supported
  return res.status(405).json({ message: 'Method Not Allowed' });
}
