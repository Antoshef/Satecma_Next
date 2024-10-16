import type { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Claims } from '@auth0/nextjs-auth0';
import { Profile } from '@/profile/types';

interface TypedNextApiRequest extends NextApiRequest {
  body: Profile;
}

const tableName = 'users';

function isValidUser(user: Claims): boolean {
  return !!user.sub && !!user.email;
}

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === 'POST') {
    try {
      const userData: Profile = req.body;

      if (!isValidUser(userData)) {
        return res.status(400).json({ message: 'Invalid user data' });
      }

      // Check if user already exists
      const checkUserQuery = `SELECT * FROM ${tableName} WHERE user_id = ?`;
      const existingUser = await queryAsync<Profile[]>(checkUserQuery, [
        userData.sub
      ]);

      if (existingUser.length > 0) {
        const user = existingUser[0];
        return res.status(202).json({
          user,
          message: 'User already exists'
        });
      }

      const insertQuery = `
        INSERT INTO ${tableName} (user_id, given_name, family_name, nickname, email, email_verified, name, picture)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;
      const values = [
        userData.sub,
        userData.given_name || null,
        userData.family_name || null,
        userData.nickname,
        userData.email,
        userData.email_verified || 0,
        userData.name,
        userData.picture
      ];

      const user = await queryAsync<Profile>(insertQuery, values);
      return res
        .status(201)
        .json({ user, message: 'User created successfully' });
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
