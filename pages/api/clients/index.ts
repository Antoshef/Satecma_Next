import { Client } from '@/clients/utils/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { ResponseQuery } from '../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    if (method === 'GET') {
      const { user_id } = req.query;

      if (!user_id) {
        return res.status(400).json({ message: 'Missing user ID' });
      }
      try {
        // Fetch clients related to the authenticated user
        const results = await queryAsync<Client[]>(
          `SELECT * FROM clients_test WHERE user_id = ?`,
          [user_id]
        );

        return res.status(200).json(results || []);
      } catch (error) {
        console.error('GET error:', error);
        return res.status(500).json({
          message: 'Internal server error'
        });
      }
    }

    if (method === 'POST') {
      try {
        const { user_id } = req.query;
        const { name, city, address, eik, vat, director, email, phone } =
          req.body as Client;
        if (!eik || !name || !city || !address || !director || !email) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the client already exists
        const existingClients = await queryAsync<Client[]>(
          `SELECT * FROM clients_test WHERE eik = ? AND user_id = ?`,
          [eik, user_id]
        );

        if (existingClients.length > 0) {
          return res.status(200).json({ message: 'Client already exists' });
        } else {
          const result = await queryAsync<ResponseQuery>(
            `
            INSERT INTO clients_test (user_id, name, city, address, eik, vat, director, email, phone)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [user_id, name, city, address, eik, vat, director, email, phone]
          );

          // Retrieve the new client with the generated UUID
          const [newClient] = await queryAsync<Client[]>(
            `SELECT * FROM clients_test WHERE id = ?`,
            [result.insertId]
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
        const {
          name,
          city,
          address,
          eik,
          vat,
          director,
          email,
          phone,
          user_id
        } = req.body as Client;
        if (user_id) {
          return res.status(400).json({ message: 'Missing User ID' });
        }
        const updateResult = await queryAsync<ResponseQuery>(
          `
          UPDATE clients_test
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
  } catch (error) {
    console.error('Session error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
