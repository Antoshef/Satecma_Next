import type { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Claims } from '@auth0/nextjs-auth0';
import { Profile } from '@/profile/types';
import { generateToken } from '@/utils/cookies';
import { serialize } from 'cookie';

interface TypedNextApiRequest extends NextApiRequest {
  body: Claims;
}

const tableName = 'users';

// Validate the Claims object to ensure required fields are present
function isValidUser(user: Claims): boolean {
  return (
    !!user.sub && !!user.email && !!user.nickname // Assuming Auth0 provides the nickname as username
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
      const checkUserQuery = `SELECT * FROM ${tableName} WHERE sub = ?`;
      const existingUser = await queryAsync<Profile[]>(checkUserQuery, [
        userData.sub
      ]);

      if (existingUser.length > 0) {
        const user = existingUser[0];

        if (user) {
          const token = generateToken(user.id);
          res.setHeader(
            'Set-Cookie',
            serialize('token', token, {
              httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
              secure: process.env.NODE_ENV === 'production', // Use HTTPS only in production
              sameSite: 'strict', // Prevents CSRF attacks
              path: '/',
              maxAge: 60 * 60 * 24 * 7 // 1 week
            })
          );
        }
        return res.status(202).json({
          user: existingUser[0],
          message: 'User already exists'
        });
      }

      // Insert the new user into the users table
      const insertQuery = `
        INSERT INTO ${tableName} (sub, given_name, family_name, nickname, email, email_verified)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      const values = [
        userData.sub,
        userData.given_name || null,
        userData.family_name || null,
        userData.nickname,
        userData.email,
        userData.email_verified || 0
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
