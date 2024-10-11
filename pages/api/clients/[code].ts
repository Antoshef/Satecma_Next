import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Client } from '@/clients/utils/types';

// Fetch client by client_uuid
const fetchClientByCode = async (code: string): Promise<Client | null> => {
  const results = await queryAsync<Client[]>(
    'SELECT * FROM clients WHERE client_uuid = ?',
    [code]
  );
  return results.length > 0 ? results[0] : null;
};

// Update client information
const updateClient = async (client: Client, code: string) => {
  const clientToUpdate = await fetchClientByCode(code);
  if (!clientToUpdate) {
    throw new Error('Client not found');
  }

  const query = `
    UPDATE clients
    SET 
      name = ?, 
      city = ?, 
      address = ?, 
      eik = ?, 
      vat = ?, 
      director = ?, 
      email = ?, 
      phone = ?
    WHERE client_uuid = ?`;

  const values = [
    client.name,
    client.city,
    client.address,
    client.eik,
    client.vat,
    client.director,
    client.email,
    client.phone,
    code
  ];

  await queryAsync<Client>(query, values);
};

// Delete client
const deleteClient = async (code: string) => {
  const clientToDelete = await fetchClientByCode(code);
  if (!clientToDelete) {
    throw new Error('Client not found');
  }

  await queryAsync(`DELETE FROM clients WHERE client_uuid = ?`, [code]);
};

// Handle GET request
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  try {
    const client = await fetchClientByCode(code as string);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    return res.status(200).json(client);
  } catch (error) {
    console.error('GET error:', error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// Handle PUT request
const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;
  const { client } = req.body as { client: Client };

  if (!client || !code) {
    return res.status(400).json({ message: 'Missing required client fields' });
  }

  try {
    await updateClient(client, code as string);
    return res.status(200).json({ message: 'Client updated' });
  } catch (error) {
    console.error('PUT error:', error);
    return res.status(500).json({
      message: 'Error updating client',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Handle DELETE request
const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: 'Missing client identifier' });
  }

  try {
    await deleteClient(code as string);
    return res.status(200).json({ message: 'Client deleted' });
  } catch (error) {
    console.error('DELETE error:', error);
    return res.status(500).json({
      message: 'Error deleting client',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { code } = req.query;

  switch (method) {
    case 'GET':
      return await handleGetRequest(req, res);
    case 'PUT':
      return await handlePutRequest(req, res);
    case 'DELETE':
      return await handleDeleteRequest(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
