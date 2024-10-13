import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Client } from '@/clients/utils/types';

// Fetch client by client_uuid and user_id
const fetchClientByCode = async (
  code: string,
  user_id: string
): Promise<Client | null> => {
  const results = await queryAsync<Client[]>(
    'SELECT * FROM clients WHERE client_uuid = ? AND user_id = ?',
    [code, user_id]
  );
  return results.length > 0 ? results[0] : null;
};

// Update client information
const updateClient = async (client: Client, code: string, user_id: string) => {
  const clientToUpdate = await fetchClientByCode(code, user_id);
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
    WHERE client_uuid = ? AND user_id = ?`;

  const values = [
    client.name,
    client.city,
    client.address,
    client.eik,
    client.vat,
    client.director,
    client.email,
    client.phone,
    code,
    user_id
  ];

  await queryAsync<Client>(query, values);
};

// Delete client by client_uuid and user_id
const deleteClient = async (code: string, user_id: string) => {
  const clientToDelete = await fetchClientByCode(code, user_id);
  if (!clientToDelete) {
    throw new Error('Client not found');
  }

  await queryAsync(
    `DELETE FROM clients WHERE client_uuid = ? AND user_id = ?`,
    [code, user_id]
  );
};

// Handle GET request
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, code } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'Missing user ID' });
  }

  try {
    const client = await fetchClientByCode(code as string, userId as string);
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
  const { code, userId } = req.query;
  const { client } = req.body as { client: Client };

  if (!client || !code) {
    return res.status(400).json({ message: 'Missing required client fields' });
  }

  try {
    await updateClient(client, code as string, userId as string);
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
  const { userId, code } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'Missing user ID' });
  }
  if (!code) {
    return res.status(400).json({ message: 'Missing client identifier' });
  }

  try {
    await deleteClient(code as string, userId as string);
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
