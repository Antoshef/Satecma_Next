import { Client } from '@/clients/utils/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const results = await queryAsync<Client[]>(`SELECT * FROM clients`);
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
      const clients = await queryAsync<Client[]>(`SELECT * FROM clients`);
      const { name, city, address, eik, vat, director, email, phone } =
        req.body as Client;
      if (!eik) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      if (clients.find((client) => client.eik === eik)) {
        return res.status(200).json({ message: 'Client already exists' });
      } else {
        await queryAsync(
          `
          INSERT INTO clients (name, city, address, eik, vat, director, email, phone)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
          [name, city, address, eik, vat, director, email, phone]
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
      const { name, city, address, eik, vat, director, email, phone } =
        req.body as Client;
      if (!eik) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      await queryAsync(
        `
        UPDATE clients
        SET name = ?, city = ?, address = ?, vat = ?, director = ?, email = ?, phone = ?
        WHERE eik = ?
      `,
        [name, city, address, vat, director, email, phone, eik]
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
