import type { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Claims } from '@auth0/nextjs-auth0';

interface TypedNextApiRequest extends NextApiRequest {
  body: Claims;
}

const tableName = 'users'; // Renamed to users

// Validate the Claims object to ensure required fields are present
function isValidUser(user: Claims): boolean {
  return (
    !!user.sub &&
    !!user.email &&
    !!user.nickname // Assuming Auth0 provides the nickname as username
  );
}

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === 'POST') {
    try {
      const userData: Claims = req.body;

      if (!isValidUser(userData)) {
        return res.status(400).json({ message: 'Invalid user data' });
      }

      // Check if user already exists
      const checkUserQuery = `SELECT * FROM ${tableName} WHERE id = ?`;
      const existingUser = await queryAsync<Claims[]>(checkUserQuery, [userData.sub]);

      if (existingUser.length > 0) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Insert the new user into the users table
      const insertQuery = `
        INSERT INTO ${tableName} (id, given_name, family_name, username, email, email_verified)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      const values = [
        userData.sub, // Auth0 sub used as id
        userData.given_name || null, // First name
        userData.family_name || null, // Last name
        userData.nickname, // Username (coming from Auth0 nickname)
        userData.email, // Email
        userData.email_verified || false // Email verified status
      ];

      await queryAsync(insertQuery, values);
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('POST error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else if (method === 'GET') {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ message: 'Missing email parameter' });
      }

      const getUserQuery = `SELECT * FROM ${tableName} WHERE email = ?`;
      const user = await queryAsync<Claims[]>(getUserQuery, [email]);

      if (user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user[0]);
    } catch (error) {
      console.error('GET error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    try {
      const { email, email_verified } = req.body;
      if (!email || typeof email_verified !== 'boolean') {
        return res.status(400).json({ message: 'Invalid request data' });
      }

      const updateUserQuery = `
        UPDATE ${tableName}
        SET email_verified = ?
        WHERE email = ?;
      `;
      await queryAsync(updateUserQuery, [email_verified, email]);

      const getUserQuery = `SELECT * FROM ${tableName} WHERE email = ?`;
      const updatedUser = await queryAsync<Claims[]>(getUserQuery, [email]);

      if (updatedUser.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ data: updatedUser[0] });
    } catch (error) {
      console.error('PUT error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
