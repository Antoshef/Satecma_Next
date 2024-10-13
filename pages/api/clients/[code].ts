import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Client } from '@/clients/utils/types';
import { ResponseQuery } from '../types';

const updateClient = async (
  client: Client,
  client_uuid: string,
  user_id: string
) => {
  const query = `
    UPDATE clients_test
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
    client_uuid,
    user_id
  ];

  return await queryAsync<ResponseQuery>(query, values);
};

// Delete client by client_uuid and user_id
const deleteClient = async (client_uuid: string, user_id: string) => {
  return await queryAsync<ResponseQuery>(
    `DELETE FROM clients_test WHERE client_uuid = ? AND user_id = ?`,
    [client_uuid, user_id]
  );
};

// Handle GET request
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, client_uuid } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: 'Missing user ID' });
  }
  if (!client_uuid) {
    return res.status(400).json({ message: 'Missing client identifier' });
  }

  try {
    const [client] = await queryAsync<Client[]>(
      `SELECT * FROM clients_test WHERE client_uuid = ? AND user_id = ?`,
      [client_uuid, user_id]
    );

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
  const { user_id, ...client } = req.body as Client;
  const { code: client_uuid } = req.query;

  if (!client || !client_uuid || !user_id) {
    return res.status(400).json({ message: 'Missing required client fields' });
  }

  try {
    await updateClient(client, client_uuid as string, user_id as string);
    const [updatedClient] = await queryAsync<Client[]>(
      `SELECT * FROM clients_test WHERE client_uuid = ?`,
      [client_uuid]
    );

    return res
      .status(200)
      .json({ message: 'Client updated', client: updatedClient });
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
  const { user_id, client_uuid } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: 'Missing user ID' });
  }
  if (!client_uuid) {
    return res.status(400).json({ message: 'Missing client identifier' });
  }

  try {
    await deleteClient(client_uuid as string, user_id as string);
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
